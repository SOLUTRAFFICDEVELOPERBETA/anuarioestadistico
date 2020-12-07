import React from 'react'
import { Typography, Divider, Box } from '@material-ui/core'
import PropTypes from 'prop-types'

/**
 * @description Componente que permite integrar un subtitulo en un página
 * @param {String} primary 
 * @param {String} secondary 
 * Consulte los elementos utilizados en {@link https://material-ui.com/ | Material-ui}
 */
const Subtitle = ({ primary, secondary }) => (
  <Box marginBottom={2}>
    <Typography variant="h6" color="primary" style={{ textTransform: 'uppercase' }}>
      {primary}
    </Typography>
    <Typography variant="body2" color="secondary">
      <em>{secondary}</em>
    </Typography>
    <Divider variant="inset" />
  </Box>
)

Subtitle.propTypes = {
  primary: PropTypes.string.isRequired,
  secondary: PropTypes.string
}

Subtitle.defaultProps = {
  secondary: ''
}

export default Subtitle
