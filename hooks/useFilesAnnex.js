import React from 'react';
import { UploadFile } from '../constants/files';
import { COLOR_GRAPH } from '../constants';


const useFilesAnnex =  (files, path) => {

    const [data, setData] = React.useState(null)

    const [file] = files
    const { pathCsv } = UploadFile(file, path, shortid.generate()).then(url => url)
    const readCSV =  fb.functions.httpsCallable('onReadCSV')
    readCSV(pathCsv).then(res => {
        let labels = []; const datasets = []
        res.data.forEach((item, index) => {
            const [head, ...others] = Object.entries(item)
            datasets[index] = {
                label: head[1],
                ...COLOR_GRAPH,
                data: others.map(d => d[1])
            }
            labels = others.map(d => d[0])
        })
        setData({ labels, datasets })

    })


    return {data};
}

export default useFilesAnnex;