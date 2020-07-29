import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { PARAGRAPH, QUOTES, TITLE, SUBTITLE } from '../../constants/documents'
import EditorContext from '../../contexts/editor'
import { Box, Grid, IconButton, makeStyles, MenuItem, Popover, TextField, Tooltip } from '@material-ui/core'
import { DeleteForever } from '@material-ui/icons'

const TEXT_TYPES = {
  [TITLE]: 'Titulo',
  [SUBTITLE]: 'Subtitulo',
  [PARAGRAPH]: 'Párrafo',
  [QUOTES]: 'Cuotas'
}

const InputContainer = styled.div`
  width: 100%;
  padding: 24px;
  transition: background-color 0.5s ease, z-index 0.5s ease, box-shadow 0.5s ease;

  :focus-within {
    background-color: #eee;
    z-index: 5;
    -webkit-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
  }

  span {
    color: inherit;
    border: 0px;
    width: 100%;
    padding: 0.5rem;
    max-height: fit-content;
    display: block;
    width: 100%;
    overflow: hidden;
    resize: none;
    min-height: 40px;
  }

  span:hover {
    cursor: pointer;
  }

  span:focus {
    cursor: text;
    background-color: #fff;
  }

  span[contentEditable]:empty::before {
    content: "Haz click para editar";
    color: gray;
  }

  span[data-type=${TITLE}] {
    font-family: ""Roboto", "Helvetica", "Arial", sans-serif";
    font-weight: 400;
    font-size: 2.125rem;
    line-height: 1.235;
    letter-spacing: 0.00735em;
  }

  span[data-type=${SUBTITLE}] {
    font-family: ""Roboto", "Helvetica", "Arial", sans-serif";
    font-weight: 500;
    font-size: 1.25rem;
    line-height: 1.6;
    letter-spacing: 0.0075em;
  }

  span[data-type=${PARAGRAPH}] {
    font-family: ""Roboto", "Helvetica", "Arial", sans-serif";
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.5;
    letter-spacing: 0.00938em;
  }

  span[data-type=${QUOTES}] {
    font-family: ""Roboto", "Helvetica", "Arial", sans-serif";
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.5;
    letter-spacing: 0.00938em;
  }

  span[data-type=${QUOTES}]::before{
    content: open-quote;
    font-weight: bold;
  }

  span[data-type=${QUOTES}]::after{
    content: close-quote;
    font-weight: bold;
  }
`

const useStyles = makeStyles(theme => ({
  option: {
    minWidth: theme.spacing(20)
  }
}))

const TextInput = ({ id, value, type, size }) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)
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

  const handleChange = event => {
    const { target: { textContent } } = event
    onChangeField(id, textContent)
  }

  const handleChangeProps = ({ target: { name, value } }) => {
    onChangeField(id, { [name]: value })
  }

  const open = Boolean(anchorEl)

  return (
    <React.Fragment>
      <InputContainer id={id} onContextMenu={handleClick}>
        <span
          data-type={type}
          contentEditable
          onBlur={handleChange}
          // value={value}
          // onChange={handleChange}
        >
          {value}
        </span>
      </InputContainer>
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
                  label="Tipo de campo"
                  select
                  size="small"
                  variant="outlined"
                  value={type}
                  name="type"
                  onChange={handleChangeProps}
                  className={classes.option}
                >
                  {[TITLE, SUBTITLE, PARAGRAPH, QUOTES].map(($type, $key) => (
                    <MenuItem disabled={$type === type} value={$type} key={$key}>
                      {TEXT_TYPES[$type]}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  label="Tamaño del objeto"
                  select
                  size="small"
                  variant="outlined"
                  value={size}
                  name="size"
                  onChange={handleChangeProps}
                  className={classes.option}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map($size => (
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

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string,
  type: PropTypes.string,
  size: PropTypes.any
}

export default TextInput
