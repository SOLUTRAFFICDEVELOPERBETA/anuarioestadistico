import React from 'react'
import { IconButton, makeStyles, Snackbar } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { green, red, orange } from '@material-ui/core/colors'
import AlertContext from '../contexts/alert'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    top: 0,
    left: 0,
    padding: theme.spacing(1.5),
    width: '100%',
    zIndex: 1600,

    [theme.breakpoints.down('md')]: {
      width: 'auto',
      height: 'fit-content',
      bottom: theme.spacing(2),
      right: theme.spacing(3),
      borderRadius: theme.spacing(1),
      left: 'auto',
      margin: theme.spacing(1, 0)
    }
  },
  success: {
    backgroundColor: green[600],
    fontSize: '1.5rem',
    color: theme.palette.getContrastText(green[600])
  },
  error: {
    backgroundColor: red[600],
    fontSize: '1.5rem',
    color: theme.palette.getContrastText(red[600])
  },
  warning: {
    backgroundColor: orange[600],
    color: theme.palette.getContrastText(orange[600]),
    fontSize: '1.5rem'
  }
}))

const AlertMessage = () => {
  const classes = useStyles()
  const { message, closeMessage } = React.useContext(AlertContext)

  if (!message) return null

  const { text, category, time } = message

  return (
    <Snackbar
      open={Boolean(message)}
      autoHideDuration={time}
      onClose={closeMessage}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
      ContentProps={{
        classes: {
          root: classes[category]
        }
      }}
      message={text}
      action={
        <React.Fragment>
          <IconButton size="small" color="inherit" onClick={closeMessage}>
            <Close fontSize="small" />
          </IconButton>
        </React.Fragment>
      }
    />
  )
}

export default AlertMessage
