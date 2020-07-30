import { createMuiTheme } from '@material-ui/core'

const defaultTheme = createMuiTheme()

// Tema inicial de la aplicación
const theme = createMuiTheme({
  ...defaultTheme,
  palette: {
    primary: {
      main: '#0d283d',
      light: '#395068',
      dark: '#000018',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#1b4772'
    },
    common: {
      main: '#01579b'
    },
    success: {
      main: '#2e7d32'
    },
    error: {
      main: '#d50000',
      dark: '#9b0000',
      light: '#ff5131',
      contrastText: '#ffffff'
    },
    paper: '#fff',
  },
  
  typography: {
    fontFamily: [
      'Roboto'
    ].join(',')
    
  },
  
})

export default theme
