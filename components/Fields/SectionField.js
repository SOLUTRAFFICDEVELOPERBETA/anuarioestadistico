import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import { Box, Button, ButtonGroup, Grid, IconButton, makeStyles, MenuItem, Popover, TextField, Tooltip } from '@material-ui/core'
import { DeleteForever, ImageTwoTone, MoreVert, Remove, TextFields } from '@material-ui/icons'
import React from 'react'
import { FIELDS } from '../../constants/templates'
import shortid from 'shortid'
import { DIVIDER, IMAGE, PARAGRAPH, QUOTES, SUBTITLE, TITLE } from '../../constants/documents'
import TextInput from './TextInput'
import ImageField from './ImageField'
import { DragPreviewImage, useDrag, useDrop } from 'react-dnd'
import clsx from 'clsx'
import { moveArray } from '../../constants/utils'
import DividerLine from './DividerLine'

const BoxContainer = styled(Box)`
  padding: 16px;
  transition: background-color 0.5s ease, z-index 0.5s ease, box-shadow 0.5s ease;

  :focus-within {
    background-color: #fff;
    z-index: 3;
    -webkit-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
  }

  .container-section {
    padding: 8px;
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .container-section[aria-valuenow="0"] {
    border: 1px dashed var(--primary);
    transition: border 1s ease;
  }

  .container-section:not([aria-valuenow="0"]) {
    border: 1px solid #ccc;
  }

  .container-section:focus-within {
    border: 1px solid var(--primary);
  }

  .container-section:not([aria-valuenow="0"]) .options {
    margin-top: 1rem;
  }

  .field {
    width: 100%;
  }
`

const usePlacementStyles = makeStyles(theme => ({
  root: {
    height: theme.spacing(0.5),
    transition: theme.transitions.create(['height', 'backgroundColor'], {
      duration: theme.transitions.duration.complex
    })
  },
  over: {
    height: theme.spacing(1),
    backgroundColor: theme.palette.primary.light
  }
}))

const DropPlacement = ({ onDrop }) => {
  const classes = usePlacementStyles()

  const [{ isOver }, drop] = useDrop({
    accept: 'CHILD',
    drop: (item) => onDrop(item),
    collect: mon => ({
      isOver: !!mon.isOver()
    })
  })

  return <div className={clsx(classes.root, { [classes.over]: isOver })} ref={drop} />
}

DropPlacement.propTypes = {
  onDrop: PropTypes.func.isRequired
}

const useStyles = makeStyles(theme => ({
  dragging: {
    backgroundColor: '#eee',
    // z-index: 5,
    boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)'
  },
  buttonLabel: {
    width: '100%',
    display: 'inherit',
    alignItems: 'inherit',
    justifyContent: 'inherit',
    transition: theme.transitions.create(['width'], {
      duration: theme.transitions.duration.short,
      easing: theme.transitions.easing.easeInOut
    }),
    [theme.breakpoints.only('md')]: {
      width: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      whiteSpace: 'nowrap',
      overflowX: 'hidden'
    }
  }
}))
/**
 * Campo contenedor de la sección
 * @param {{ id: String, value: Array, size: Number, onChange: () => {}, onDelete: () => {} }} props Propiedades del elemento
 */
const SectionField = ({ id, value, size, onChange, onDelete }) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: 'ITEM', id },
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  })

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

  const handleCreateField = type => {
    const field = {
      id: shortid.generate(),
      ...FIELDS[type]
    }
    onChange({ value: [...value, field] })
  }

  const handleChangeField = ($id, data) => {
    const $value = value.map(field => field.id === $id ? ({ ...field, ...data }) : field)
    onChange({ value: $value })
  }

  const handleDeleteField = $id => {
    const $value = value.filter(field => field.id !== $id)
    onChange({ value: $value })
  }

  const handleMoveItem = (key, item) => {
    const $fields = [...value]
    const $index = $fields.findIndex((field) => field.id === item.id)
    if ($index !== -1) {
      const arr = moveArray($fields, $index, key)
      onChange({ value: arr })
    }
  }

  const getField = ($field) => {
    const { type } = $field
    switch (type) {
      case SUBTITLE:
      case TITLE:
      case PARAGRAPH:
      case QUOTES:
        return <TextInput {...$field} size={12} child disableGrid onChange={(data) => handleChangeField($field.id, data) } onDelete={handleDeleteField} />
      case IMAGE:
        return <ImageField {...$field} size={12} child disableGrid onChange={(data) => handleChangeField($field.id, data) } onDelete={handleDeleteField} />
      case DIVIDER:
        return <DividerLine child id={$field.id} onDelete={handleDeleteField} />
      default:
        return null
    }
  }

  const open = Boolean(anchorEl)

  return (
    <React.Fragment>
      <DragPreviewImage connect={preview} src="/static/img/DragPreview.png" />
      <BoxContainer
        id={`section-container-${id}`}
        ref={drag}
        className={clsx({
          [classes.dragging]: isDragging
        })}
      >
        <div className="container-section" aria-valuenow={value.length.toString()}>
          {value.map(($field, key) => (
            <div className="field" key={`field-container-${id}-${$field.id}-${key}`}>
              {getField($field)}
              <DropPlacement onDrop={(item) => handleMoveItem(key, item)} />
            </div>
          ))}
          <Tooltip title="Añade elemento a la sección">
            <ButtonGroup
              className="options"
              size="small"
              color="primary"
              variant="outlined"
            >
              <Button
                startIcon={<TextFields />}
                onClick={() => handleCreateField(PARAGRAPH)}
                classes={{
                  label: classes.buttonLabel
                }}
              >
                Texto
              </Button>
              <Button
                startIcon={<ImageTwoTone />}
                onClick={() => handleCreateField(IMAGE)}
                classes={{
                  label: classes.buttonLabel
                }}
              >
                Imagen
              </Button>
              <Button
                startIcon={<Remove />}
                onClick={() => handleCreateField(DIVIDER)}
                classes={{
                  label: classes.buttonLabel
                }}
              >
                Divisor
              </Button>
              <Button
                onClick={handleClick}
              >
                <MoreVert />
              </Button>
            </ButtonGroup>
          </Tooltip>
        </div>
      </BoxContainer>
      {open && (
        <Popover
          id={`popover-open-${id}`}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
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
                  onChange={({ target: { value } }) => onChange({ size: value })}
                  // className={classes.option}
                >
                  {[6, 7, 8, 9, 10, 11, 12].map($size => (
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

SectionField.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.array,
  size: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

SectionField.defaultProps = {
  value: [],
  size: 12
}

export default SectionField
