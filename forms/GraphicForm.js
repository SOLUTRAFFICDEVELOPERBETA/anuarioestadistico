import React from 'react';
import PropTypes from 'prop-types'
import { Dialog, Box, TextField, Button, DialogTitle, DialogContent } from '@material-ui/core';
import AuthContext from '../contexts/auth'
import AlertContext from '../contexts/alert'
import { UploadFile } from '../constants/files';
import fb from '../config/firebase';
import { CloudUpload } from '@material-ui/icons';
import shortid from 'shortid';
import Spinner from '../components/Spinner'



/**
 * Método para obtener la información del Chart
 * @param {Array} csv Documento a revisar
 */
function getChartData(csv) {
  return new Promise((resolve, reject) => {
    console.time('csv')
    const keys = csv.map(row => {
      const [, key] = Object.entries(row).find(r => r[0] === '')
      return ({ key: key.toLowerCase() })
    })
    // console.log({ keys })
    const fields = []
    keys.forEach(($key, index) => {
      Object.entries(csv[index]).forEach(([key, value]) => {
        const pos = fields.findIndex(fld => fld.name === key && key !== '')
        if (key !== '' && pos === -1) {
          fields.push({ name: key, [$key.key]: parseFloat(value) })
        } else if (pos !== -1) {
          fields[pos] = { ...fields[pos], [$key.key]: parseFloat(value) }
        }
      })
    })
    console.timeEnd('csv')
    // console.log({ fields })
    resolve({ keys, fields })
  })
}


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
      sizes: 6,
      id: shortid.generate(),
      description: data.description,
      value: dataGraphic

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
  const handleUpdateFile = async files => {
    try {
      setLoading(true)
      const [file] = files
      const { path } = await UploadFile(file, `anuarioestadistico/${shortid.generate()}${file.name}`, `${name}.csv`).then(url => url)

      // console.log({ path })

      const readCSV = fb.functions.httpsCallable('onReadCSV')

      readCSV(path).then(res => {
        showMessage("Información subida con exito", 'success')
        getChartData(res.data).then((data) => {
          setLoading(false)
          setDataGraphic(data);
          //   onChange({ value: { ...value, data } })
        })
        console.log(res.data)
      })
    } catch (error) {
      showMessage(error.message, 'error')
    }
  }


  if (loading) return <Spinner />

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
                    onChange={(e) => handleUpdateFile(e.target.files)}
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