import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import { Box, Grid, IconButton, MenuItem, Popover, TextField, Tooltip } from '@material-ui/core'
import { DeleteForever } from '@material-ui/icons'
import { useRouter } from 'next/router'
import React from 'react'
import { UploadFile } from '../../constants/files'
import AlertContext from '../../contexts/alert'
import EditorContext from '../../contexts/editor'

// Campo de la imagen
const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;

  img {
    max-width: 100%;
  }

  span {
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    padding: 16px;
    position: absolute;
    width: 100%;
    text-align: center;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 5;
    display: none;
  }

  :hover span {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .iconButton {
    cursor: pointer;
  }

  :hover .img-container {
    cursor: pointer;
  }
  
  :hover .img-container::after {
    content: "";
    background-color: rgba(0, 0, 0, 0.25);
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
  }
`

const ImageField = ({ id, value, size }) => {
  const { query } = useRouter()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const { showMessage } = React.useContext(AlertContext)
  const { onChangeField, onDeleteField } = React.useContext(EditorContext)
  /**
   * Método para abrir el popover
   * @param {Event} event Evento de click de la celda
   */
  const handleClick = (event) => {
    event.preventDefault()
    setAnchorEl(event.currentTarget)
  }

  // Método para cerrar el popover
  const handleClose = () => {
    setAnchorEl(null)
  }

  /**
     * Método para actualizar la imagen
     * @param {FileList} files Archivos a subir
     */
  const handleUpdateFile = files => {
    try {
      const [file] = files
      UploadFile(file, `/paginas/${query.id}`, file.name).then(url => {
        onChangeField(id, { value: url })
      })
    } catch (error) {
      showMessage(error.message, 'error')
    }
  }

  const open = Boolean(anchorEl)

  return (
    <React.Fragment>
      <Box padding={3} onContextMenu={handleClick}>
        <ImageContainer>
          <label htmlFor={id}>
            <div className="img-container">
              <img src={value.url} />
            </div>
          </label>
          <span>
            {value.name}
          </span>
        </ImageContainer>
      </Box>
      <input
        id={id}
        type="file"
        name={id}
        multiple={false}
        style={{ display: 'none' }}
        onChange={(e) => handleUpdateFile(e.target.files)}
      />
      {open && (
        <Popover
          id={`popover-open-${id}`}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
        >
          <Box padding={1}>
            <Grid container spacing={1} alignContent="center" alignItems="center">
              <Grid item>
                <TextField
                  fullWidth
                  label="Tamaño del objeto"
                  select
                  size="small"
                  variant="outlined"
                  value={size}
                  name="size"
                  style={{ minWidth: '160px' }}
                  onChange={({ target: { value } }) => onChangeField(id, { size: value })}
                // className={classes.option}
                >
                  {[4, 5, 6, 7, 8, 9, 10, 11, 12].map($size => (
                    <MenuItem disabled={size === $size} value={$size} key={`select-size-option-${id}-${$size}`}>
                      {$size}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item>
                <Tooltip title="Borrar" interactive>
                  <IconButton size="small" onClick={() => onDeleteField(id)}>
                    <DeleteForever color="error" />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Box>
        </Popover>
      )}
    </React.Fragment>
  )
}

ImageField.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.object,
  size: PropTypes.any
}

export default ImageField
