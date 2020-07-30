import React from 'react'
import { Box, Button } from '@material-ui/core'
import { CloudUpload } from '@material-ui/icons'
import { UploadFile } from '../constants/files'
import useChart from '../hooks/useChart'
import fb from '../config/firebase'
import  Spinner from '../components/Spinner'

const UploadCharts = () => {
    const [insert, setInsert] = React.useState(false)
    // const [setChart, ChartComponent] = useChart("datos de movilidad", 'line', ['bar', 'line'], data)
    /**
     * @description
     * Función para manejar la subida de archivos.
     * @param {FileList} files Archivos subidos del input
     */
    const handleFilesAnnex = async (files) => {
        try {
            const [file] = files
            const { path } = await UploadFile(file, 'assets/try').then(url => url)
            const readCSV = fb.functions.httpsCallable('onReadCSV')

            readCSV(path).then(res => {
                let labels = []; const datasets = []
                res.data.forEach((item, index) => {
                    const [head, ...others] = Object.entries(item)
                    // datasets[index] = {
                    //     label: head[1],
                    //     backgroundColor: constants[index],
                    //     borderColor: theme.palette.augmentColor({ main: constants[index] }).dark,
                    //     borderWidth: 1,
                    //     hoverBackgroundColor: theme.palette.augmentColor({ main: constants[index] }).dark,
                    //     data: others.map(d => d[1])
                    // }
                    labels = others.map(d => d[0])
                })
                // setChart({ labels, datasets })
                console.log("esta es la nueva data", { data: { labels, datasets } })
                setInsert(false)
            })
        } catch (error) {
            console.log(error)
        }
    }

    // if(!insert) return <Spinner/>

    
    return (
        <Box paddingLeft={2} paddingRight={2}>
            <input
                type={'file'}
                name="csv-upload"
                id="csv-upload"
                multiple={false}
                style={{ display: 'none' }}
                onChange={(e) => handleFilesAnnex(e.target.files)}
            />
            <label htmlFor="csv-upload">
                <Button
                    endIcon={<CloudUpload />}
                    component={'div'}
                    size={'small'}
                    fullWidth={true}
                    variant={'contained'}
                    color={'secondary'}
                >
                    Subir datos de Gráficas
                      </Button>
            </label>
        </Box>
    )
}
export default UploadCharts;