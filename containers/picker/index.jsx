import React from 'react'
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  makeStyles,
  Popover,
  IconButton,
  SvgIcon,
  useTheme
} from '@material-ui/core'
import { COLORS } from '../../constants/options'
import PropTypes from 'prop-types'

// Estilos del componente para ceparar por cuatro colunas los colores
const useStyles = makeStyles(theme => ({
  colorPalette: {
    display: 'grid',
    'grid-template-columns': 'repeat(4, 1fr)'
  }
}))

/**
 * @description Componente que permite el cambio de colores de la paleta
 * @param {String} color 
 * @param {String} palette 
 * @param {func: ()=> void} onChange 
 * Consulte los elementos utilizados en {@link https://material-ui.com/ | Material-ui}
 */
const ColorPicker = ({ color, palette, onChange }) => {
  const classes = useStyles()
  const [anchorEL, setAnchorEL] = React.useState(null)
  const theme = useTheme()

  /**
     * Método para alterar el contenido de la paleta.
     * @param {string} main Código RGB
     */
  const handleChange = main => {
    onChange(theme.palette.augmentColor({ main }))
    setAnchorEL(null)
  }

  /**
     * Función para mostrar el popover al pasar el mouser
     * @param {event} event Evento del mouse
     */
  const handlePopOverOpen = (event) => {
    setAnchorEL(event.currentTarget)
  }

  // Función para cerrar le popover
  const handlePopoverClose = () => {
    setAnchorEL(null)
  }

  const open = Boolean(anchorEL)

  return (
    <ListItem divider>
      <ListItemText primary={color.toUpperCase()} />
      <ListItemSecondaryAction>
        <IconButton onClick={handlePopOverOpen}>
          <SvgIcon>
            <svg height="24" width="24">
              <rect height="24" width="24" style={{ fill: palette.main }} />
            </svg>
          </SvgIcon>
        </IconButton>
        <Popover
          id={`color-popover-${color}`}
          open={open}
          anchorEl={anchorEL}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
        >
          <div className={classes.colorPalette}>
            {COLORS.map((rgb, index) => (
              <IconButton onClick={() => handleChange(rgb)} key={index}>
                <SvgIcon>
                  <svg width="200" height="200">
                    <rect width="200" height="200" style={{ fill: rgb }} />
                  </svg>
                </SvgIcon>
              </IconButton>
            ))}
          </div>
        </Popover>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

ColorPicker.propTypes = {
  color: PropTypes.string.isRequired,
  palette: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default ColorPicker
