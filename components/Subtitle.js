import React from 'react'
import { Typography, Divider, Box } from '@material-ui/core'
import PropTypes from 'prop-types'

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
