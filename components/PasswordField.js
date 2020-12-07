import React from 'react'
import { TextField, InputAdornment, IconButton } from '@material-ui/core'
import {
  LockTwoTone,
  VisibilityOffTwoTone,
  VisibilityTwoTone
} from '@material-ui/icons'

/**
 * @description
 * Campo de contraseña,
 * @see TextField hereda las propiedades del un TextField
 * @param {*} props Propiedades del componente
 * Consulte los elementos utilizados en {@link https://material-ui.com/ | Material-ui}
 */
const PasswordField = (props) => {
  const [view, setView] = React.useState(false)

  return (
    <TextField
      fullWidth
      margin="dense"
      color="primary"
      variant="outlined"
      type={view ? 'text' : 'password'}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <LockTwoTone color="primary" />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton size="small" color="primary" onClick={() => setView(!view)}>
              {view ? <VisibilityOffTwoTone /> : <VisibilityTwoTone />}
            </IconButton>
          </InputAdornment>
        )
      }}
      {...props}
    />
  )
}

export default PasswordField
