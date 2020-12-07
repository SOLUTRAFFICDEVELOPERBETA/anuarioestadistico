/* eslint-disable indent */
import React from 'react'
import PropTypes from 'prop-types';
import { CloudUploadTwoTone } from '@material-ui/icons';
import { Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  image: {
    width: '100%',
    maxHeight: '100%',
    objectFit: 'cover'
  },
  imageContainer: {
    maxWidth: '100%',
    padding: '0.5rem',
    border: '3px solid ',
    borderColor: theme.palette.primary.light,
    borderRadius: '10px',
    color: theme.palette.primary.light
  }
}))

/**
 * @description Componente que permite la subida de una imagen
 * @param {any} value
 * @param {func: () => void } onChange
 * Consulte los elementos utilizados en {@link https://material-ui.com/ | Material-ui}
 */
const ImageInput = ({ label, value, onChange }) => {
  const classes = useStyles()
  /**
   * Método para recibir y enviar los cambios en la imagen
   * @param {FileList} files Archivos a subir
   */
  const handleChange = files => {
    const [file] = files
    onChange(file)
  }

  return (
    <div >
      <label htmlFor="annex">
        <Grid container alignContent="center" alignItems="center" justify="center">
          <Grid item container justify="center" direction="column" alignContent="center" alignItems="center" xl={12} lg={12} md={12} sm={12} xs={12} className={classes.imageContainer}>
            {value ? (

              <img className={classes.image}
                src={value} />

            ) : (
                <React.Fragment>
                  <CloudUploadTwoTone fontSize="large" color="primary" />
                  <p>{label}</p>
                </React.Fragment>
              )}
          </Grid>
        </Grid>
      </label>
      <input
        id="annex"
        type="file"
        name="annex"
        multiple={false}
        style={{ display: 'none' }}
        onChange={(e) => handleChange(e.target.files)}
      />
    </div>
  )
}

ImageInput.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func
}

ImageInput.defaultProps = {
  label: 'Subir File',
  value: '',
  onChange: (file) => console.log(file)
}

export default ImageInput
