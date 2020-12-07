import React from 'react'
import PropTypes from 'prop-types'
import { IconButton, SvgIcon, Popover, makeStyles } from '@material-ui/core'

// Estilos del coponente parar divivir los colores en 7 columnas
const useStyles = makeStyles({
  colorPalette: {
    display: 'grid',
    'grid-template-columns': 'repeat(7, 1fr)'
  }
});

/**
 * @description Componente que permite visualizar los colores de la paleta
 * @param {Object} palette
 * Consulte los elementos utilizados en {@link https://material-ui.com/ | Material-ui}
 */
const ColorPalette = ({ palette }) => {
  const classes = useStyles()
  const [anchorEL, setAnchorEL] = React.useState(null)

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
    <React.Fragment>
      <IconButton onClick={handlePopOverOpen}>
        <SvgIcon>
          <svg height="24" width="24">
            <rect height="24" width="24" style={{ fill: palette.primary.main }} />
          </svg>
        </SvgIcon>
      </IconButton>
      <Popover
        id={'color-popover'}
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
          <SvgIcon>
            <svg width="200" height="200">
              <rect width="200" height="200" style={{ fill: palette.primary.main }} />
            </svg>
          </SvgIcon>
          <SvgIcon>
            <svg width="200" height="200">
              <rect width="200" height="200" style={{ fill: palette.secondary.main }} />
            </svg>
          </SvgIcon>
          <SvgIcon>
            <svg width="200" height="200">
              <rect width="200" height="200" style={{ fill: palette.common.main }} />
            </svg>
          </SvgIcon>
          <SvgIcon>
            <svg width="200" height="200">
              <rect width="200" height="200" style={{ fill: palette.success.main }} />
            </svg>
          </SvgIcon>
          <SvgIcon>
            <svg width="200" height="200">
              <rect width="200" height="200" style={{ fill: palette.error.main }} />
            </svg>
          </SvgIcon>
          <SvgIcon>
            <svg width="200" height="200">
              <rect width="200" height="200" style={{ fill: palette.warning.main }} />
            </svg>
          </SvgIcon>
          <SvgIcon>
            <svg width="200" height="200">
              <rect width="200" height="200" style={{ fill: palette.info.main }} />
            </svg>
          </SvgIcon>
        </div>
      </Popover>
    </React.Fragment>
  )
}

ColorPalette.propTypes = {
  palette: PropTypes.object
}

export default ColorPalette
