import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { PARAGRAPH, QUOTES, TITLE, SUBTITLE } from '../../constants/documents'
// import EditorContext from '../../contexts/editor'
import { Box, Grid, IconButton, makeStyles, MenuItem, Popover, TextField, Tooltip } from '@material-ui/core'
import { DeleteForever, DragIndicator } from '@material-ui/icons'
import { DragPreviewImage, useDrag } from 'react-dnd'
import clsx from 'clsx'
import { grey } from '@material-ui/core/colors'

const TEXT_TYPES = {
  [TITLE]: 'Titulo',
  [SUBTITLE]: 'Subtitulo',
  [PARAGRAPH]: 'Párrafo',
  [QUOTES]: 'Cuotas'
}

const InputContainer = styled.div`
  width: 100%;
  padding: 16px;
  transition: background-color 0.5s ease, z-index 0.5s ease, box-shadow 0.5s ease;
  display: grid;
  grid-template-columns: 0px auto;

  :focus-within {
    background-color: #eee;
    z-index: 5;
    -webkit-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
    grid-template-columns: 0px auto;
    transition: 0.5s;
  }

  :hover {
    grid-template-columns: 30px auto;
  }

  .dragger {
    align-self: center;
    justify-self: center;
    width: 24px;
    height: 24px;
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s, opacity 0.5s linear;
  }

  :hover .dragger {
    visibility: visible;
    opacity: 1;
  }

  .dragger:hover {
    cursor: move;
  }

  .text-field {
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
    transition: font-size 0.5s ease;
  }

  .text-field:hover {
    cursor: pointer;
  }

  .text-field:focus {
    cursor: text;
    background-color: #fff;
  }

  .text-field[contentEditable]:empty::before {
    content: "Haz click para editar";
    color: gray;
  }

  .text-field[data-type=${TITLE}] {
    font-family: ""Roboto", "Helvetica", "Arial", sans-serif";
    font-weight: 400;
    font-size: 2.125rem;
    line-height: 1.235;
    letter-spacing: 0.00735em;
  }

  .text-field[data-type=${SUBTITLE}] {
    font-family: ""Roboto", "Helvetica", "Arial", sans-serif";
    font-weight: 500;
    font-size: 1.25rem;
    line-height: 1.6;
    letter-spacing: 0.0075em;
  }

  .text-field[data-type=${PARAGRAPH}] {
    font-family: ""Roboto", "Helvetica", "Arial", sans-serif";
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.5;
    letter-spacing: 0.00938em;
  }

  .text-field[data-type=${QUOTES}] {
    font-family: ""Roboto", "Helvetica", "Arial", sans-serif";
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.5;
    letter-spacing: 0.00938em;
  }

  .text-field[data-type=${QUOTES}]::before{
    content: open-quote;
    font-weight: bold;
  }

  .text-field[data-type=${QUOTES}]::after{
    content: close-quote;
    font-weight: bold;
  }
`

const useStyles = makeStyles(theme => ({
  option: {
    minWidth: theme.spacing(20)
  },
  dragging: {
    backgroundColor: '#eee',
    // z-index: 5,
    boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)'
  }
}))

const TextInput = ({ id, value, type, size, child, disableGrid, onChange, onDelete }) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: child ? 'CHILD' : 'ITEM', id },
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  })
  // const { onChangeField, onDeleteField } = React.useContext(EditorContext)

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
    const { currentTarget: { innerText } } = event
    // console.log({ currentTarget }, currentTarget.innerText)
    // console.log({ innerText })
    onChange({ value: innerText })
  }

  const handleChangeProps = ({ target: { name, value } }) => {
    onChange({ [name]: value })
  }

  const open = Boolean(anchorEl)

  return (
    <React.Fragment>
      <DragPreviewImage connect={preview} src="/static/img/DragPreview.png" />
      <InputContainer
        ref={drag}
        id={id}
        onContextMenu={handleClick}
        className={clsx({
          [classes.dragging]: isDragging
        })}
      >
        <span className="dragger">
          <DragIndicator style={{ fill: grey[500] }} />
        </span>
        <span
          data-type={type}
          contentEditable
          className="text-field"
          onBlur={handleChange}
          dangerouslySetInnerHTML={{ __html: value }}
        // value={value}
        // onChange={handleChange}
        />
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
                  disabled={disableGrid}
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
                  <IconButton size="small" onClick={() => onDelete(id)}>
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
  size: PropTypes.any,
  child: PropTypes.bool,
  disableGrid: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

TextField.defaultProps = {
  value: '',
  type: PARAGRAPH,
  size: 12,
  child: false,
  disableGrid: false
}

export default TextInput
