import React from 'react'
import PropTypes from 'prop-types'
import { List, ListSubheader, ListItem, ListItemText, ListItemSecondaryAction } from '@material-ui/core'
import ColorPalette from './color'
import { THEMES } from '../../constants/options'

/**
 * @description Componente que se encarga de mostrar los temas de la plataforma
 * @param {Array []} themes 
 * @param {func: ()=> void} onSelect 
 * Consulte los elementos utilizados en {@link https://material-ui.com/ | Material-ui}
 */
const ThemeSelector = ({ themes, onSelect }) => {
  return (
    <List dense subheader={<ListSubheader>Temas de la Plataforma</ListSubheader>}>
      {themes.map((theme, index) => (
        <ListItem button key={index} onClick={() => onSelect(theme.palette)}>
          <ListItemText primary={theme.name} />
          <ListItemSecondaryAction>
            <ColorPalette palette={theme.palette} />
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  )
}

ThemeSelector.propTypes = {
  themes: PropTypes.array,
  onSelect: PropTypes.func
}

ThemeSelector.defaultProps = {
  themes: THEMES,
  onSelect: (p) => console.log(p)
}

export default ThemeSelector
