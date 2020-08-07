const csv = require("fast-csv");

const parseInfo = data => {
    return data;
    // let headers = Object.keys(data[0]);
    // const datasets = headers.map( value => {
    //   return { [value]: data.map( d => {
    //     return d[value]
    //   }) }
    // });
    // return {datasets, headers};
}

/**
 * Función para leer la información de un archivo CSV
 * @param {*} path Ruta del archivo CSV
 */
const readCsv = path => {
    return new Promise((resolve, reject) => {
        let info = [];
        csv
            .parseFile(path, {
                headers: true
            })
            .on('error', error => console.error(error))
            .on('data', row => info = [...info, row])
            .on('end', count => {
                // console.log('Parsed rows:', count)
                return resolve(parseInfo(info));
            });
    });
};

module.exports = Object.assign({}, {
    readCsv
});