import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button } from '@material-ui/core';
import { CloudUpload } from '@material-ui/icons';

/**
 *
 * @param {title} string titulo del componente,
 * @param {handleFilesAnnex} fn función para subir el archivo,
 * @param {name} string Nombre deñ archivo,
 * @param {id} string identifdicador  del campo,
 * @param {htmlFor} string Identificador del Label,
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
