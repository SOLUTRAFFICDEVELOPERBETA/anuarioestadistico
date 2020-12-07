import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button } from '@material-ui/core';
import { CloudUpload } from '@material-ui/icons';

/**
 * @description Componente que permite la descarga de un csv
 * @param {String}  title titulo del componente,
 * @param {func: ()=> void} handleFilesAnnex función para subir el archivo,
 * @param {String} name Nombre deñ archivo,
 * @param {string} id  string identificador  del campo,
 * @param {String} htmlFor Identificador del Label,
 * Consulte los elementos utilizados en {@link https://material-ui.com/ | Material-ui}
 */
const ButtonUploadCsv = ({ title, handleFilesAnnex, name, id, htmlFor }) => {
    return (
        <Box>
            <input
                type={'file'}
                name={name}
                id={id}
                multiple={false}
                style={{ display: 'none' }}
                onChange={(e) => handleFilesAnnex(e.target.files)}
            />
            <label htmlFor={htmlFor}>
                <Button
                    endIcon={<CloudUpload />}
                    component={'div'}
                    size={'small'}
                    fullWidth={true}
                    variant={'contained'}
                    color={'secondary'}>
                    {title}
                </Button>
            </label>
        </Box>
    );
};
ButtonUploadCsv.propTypes = {
    title: PropTypes.string,
    handleFilesAnnex: PropTypes.func,
    name: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    htmlFor: PropTypes.string
};
export default ButtonUploadCsv;
