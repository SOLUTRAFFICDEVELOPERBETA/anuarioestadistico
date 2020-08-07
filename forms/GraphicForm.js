import React from 'react';
import PropTypes from 'prop-types'
import { Dialog, Box, TextField, Button, DialogTitle, DialogContent } from '@material-ui/core';
import AuthContext from '../contexts/auth'
import AlertContext from '../contexts/alert'
import { UploadFile } from '../constants/files';
import fb from '../config/firebase';
import { CloudUpload } from '@material-ui/icons';
import shortid from 'shortid';


const GraphicForm = ({ onsubmit }) => {
    const { auth } = React.useContext(AuthContext)
    const { showMessage } = React.useContext(AlertContext)
    const [data, setData] = React.useState({
        title: '',
        description: ''
    })
    const [dataGraphic, setDataGraphic] = React.useState(null)
    const [openForm, setOpenForm] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    const { title, description } = data
    const handlenOnchange = (e) => {
        const { value, name } = e.target
        setData({ ...data, [name]: value })
    }

    const handlenSubmit = (e) => {
        e.preventDefault()
        const { title, description } = data;

        if (title.trim() === '' || description.trim() === '') {
            showMessage("Todos los campos son obligatorios", 'warning')
            return;
        }
        if (dataGraphic === null) {
            showMessage("No haz subido la información de la gráfica, en formato csv", 'warning')
            return;
        }
        const body = {
            title: data.title,
            type: 'bar',
            description: data.description,
            ...dataGraphic

        }
        onsubmit(body)

        setData({
            title: '',
            description: ''
        })
        setDataGraphic(null)

        setOpenForm(false)
    }

    /**
     * Función para subir archivos a FireStorage
     * @param file Archivo a subir a FireStorage
     */
    const handleFilesUpload = async (files) => {
        setLoading(true)
        const name = String(files[0].name).replace(/ /g, "_").toLowerCase();
        const [file] = files
        const url = await UploadFile(file, `anuarioestadistico/${shortid.generate()}${file.name}`, `${name}.csv`).then(url => url)
        const csv = await getCSVInfo(url.path);
        const body = {
            items: {
                ...url,
                data: csv.data
            }
        }
        setLoading(false)
        setDataGraphic(body);
    }

    /**
    * Función para llamar el archivo de csv y obtener su información
    * @param path Ruta del archivo a obtener la información
    * (e.j) 'plsv/examples/example.csv'
    */
    const getCSVInfo = (path) => {
        const readCSV = fb.functions.httpsCallable('onReadCSV');
        const csv = readCSV(path).then(res => {
            showMessage("Información subida con exito", 'success')
            return { data: res.data }
        })
        return csv;
    };
    return (
        <React.Fragment>
            <Box>
                <Button
                    variant="contained"
                    size="small"
                    color="secondary"
                    onClick={() => setOpenForm(true)}>crear Gráfica</Button>
            </Box>
            {openForm && (
                <Dialog
                    open={openForm}
                    onClose={() => setOpenForm(false)}
                    scroll="paper"
                    fullWidth
                    maxWidth="md"
                >
                    <DialogTitle>Ingresan la información de la gráfica</DialogTitle>
                    <DialogContent>
                        <Box>
                            <form onSubmit={handlenSubmit}>
                                <TextField
                                    style={{ paddingBottom: '1rem' }}
                                    variant="outlined"
                                    name="title"
                                    placeholder="Escriba el titulo de la gráfica"
                                    fullWidth={true}
                                    value={title}
                                    onChange={handlenOnchange}
                                />
                                <TextField
                                    variant="outlined"
                                    name="description"
                                    placeholder="Escriba el la descripción de la gráfica"
                                    rows={5}
                                    fullWidth={true}
                                    value={description}
                                    onChange={handlenOnchange}
                                />
                                <Box paddingLeft={1} paddingRight={1}>
                                    <input
                                        type={'file'}
                                        name={`anuario_uploadFile`}
                                        accept="text/csv"
                                        id={`anuario_uploadFile`}
                                        multiple={false}
                                        style={{ display: 'none' }}
                                        onChange={(e) => handleFilesUpload(e.target.files)}
                                    />
                                    <label htmlFor={`anuario_uploadFile`}>
                                        <Button
                                            endIcon={<CloudUpload />}
                                            component={'div'}
                                            size={'small'}
                                            fullWidth={true}
                                            variant={'contained'}
                                            color={'secondary'}
                                        >
                                            Cargar datos de la gráfica
                                       </Button>
                                    </label>
                                </Box>

                                <Button
                                    disabled={dataGraphic === null ? true : false}
                                    color="primary"
                                    type="submit"
                                    variant="outlined"
                                    size="medium"
                                >Crear Gráfica</Button>


                            </form>
                        </Box>


                    </DialogContent>
                </Dialog>
            )}
        </React.Fragment>

    );
}
GraphicForm.propTypes = {
    onsubmit: PropTypes.func.isRequired
}
export default GraphicForm;