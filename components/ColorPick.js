import React from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { makeStyles, IconButton, Popover, SvgIcon, Button, useTheme } from '@material-ui/core'
import { COLORS } from '../constants/colors'
import { ColorLensTwoTone } from '@material-ui/icons'

// Estilos del componente
const useStyles = makeStyles(theme => ({
  colorPalette: {
    padding: theme.spacing(1),
    display: 'grid',
    'grid-template-columns': 'repeat(6, 1fr)',
    gridColumnGap: theme.spacing(1),
    gridRowGap: theme.spacing(1)
  },
  color: {
    border: `1px solid ${theme.palette.secondary.light}`
  },
  selected: {
    backgroundColor: '#ccc'
  }
}))

// Componente de selección de colores
const ColorPick = ({ color, onChange, icon }) => {
  const classes = useStyles()
  const theme = useTheme()
  const [optionsAnchorEl, setOptionsAnchorEl] = React.useState(null)

  /**
   * Método de apertura de los campos
   * @param {Event} event Evento del botón
   */
  const handleOpenOptions = (event) => {
    setOptionsAnchorEl(event.currentTarget)
  }

  // Método de cerrado de las opciones
  const handleCloseOptions = () => {
    setOptionsAnchorEl(null)
  }

  const openOptions = Boolean(optionsAnchorEl)

  return (
    <React.Fragment>
      <Button size="small" onClick={handleOpenOptions}>
        <SvgIcon color={openOptions ? 'primary' : 'secondary'} component={icon} />
        {/* <svg height="24" width="24">
          <circle fill={color} cx="12" cy="12" r="10" />
  </svg> */}
      </Button>
      {openOptions && (
        <Popover
          open={openOptions}
          anchorEl={optionsAnchorEl}
          onClose={handleCloseOptions}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
        >
          <div className={classes.colorPalette}>
            {COLORS.map((rgb, index) => {
              const isSelected = color === rgb

              return (
                <IconButton
                  key={index}
                  size="small"
                  className={clsx({
                    [classes.selected]: isSelected,
                    [classes.color]: !isSelected
                  })}
                  onClick={() => onChange(rgb)}
                >
                  <SvgIcon>
                    <svg height="24" width="24">
                      <circle
                        fill={isSelected ? theme.palette.augmentColor({ main: rgb }).dark : rgb }
                        cx="12"
                        cy="12"
                        r="10"
                      />
                    </svg>
                  </SvgIcon>
                </IconButton>
              )
            })}
          </div>
        </Popover>
      )}
    </React.Fragment>
  )
}

ColorPick.propTypes = {
  color: PropTypes.string,
  onChange: PropTypes.func,
  icon: PropTypes.node
}

ColorPick.defaultProps = {
  icon: ColorLensTwoTone
}

export default ColorPick
