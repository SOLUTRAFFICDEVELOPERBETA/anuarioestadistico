/* eslint-disable space-before-function-paren */
import React from 'react'
import PropTypes from 'prop-types'
import { css, Global } from '@emotion/core'
import Head from 'next/head'
import { createMuiTheme, MuiThemeProvider, CssBaseline } from '@material-ui/core';
import ThemeContext from '..'
import ThemeReducer from '../reducer'
import { EDIT_PALETTE, GET_THEME } from '../../../constants/types'
import { THEMES } from '../../../constants/options'
import theme from '../../../config/theme'
import fb from '../../../config/firebase'
import Spinner from '../../../components/Spinner'
import AlertContext from '../../alert'

const ThemeProvider = ({ children }) => {
  const initial = {
    palette: theme.palette,
    bg: {
      name: 'background',
      url: '',
      path: ''
    },
    themes: THEMES,
    infoFooter: {}
  }
  const themeDefault = createMuiTheme()
  const [load, setLoad] = React.useState(true)
  const { showMessage } = React.useContext(AlertContext)
  const [state, dispatch] = React.useReducer(ThemeReducer, initial)

  /**
   * @description Función que permite guardar los cambios realizados en la págiande configuración
   * @param {Object {}} data 
   */
  function SaveChange(data) {
    fb.db.collection('configuration').doc('theme').set(data).then(() => {
      showMessage('Los cambios se guardaron correctamente', 'success')
    })
  }

  /**
   * @description Función que permite guardar los cambios realizandos en la paleta de la plataforma 
   * @param {Object} palette 
   */
  function EditPalette(palette) {
    dispatch({
      type: EDIT_PALETTE,
      payload: palette
    })
  }

  React.useEffect(() => {
    const getConfig = () => {
      if (load) {
        fb.db.collection('configuration').doc('theme').onSnapshot(query => {
          dispatch({
            type: GET_THEME,
            payload: query.data()
          })
          setLoad(false)
        })
      }
    }
    getConfig()
  }, [load])

  if (load) return <Spinner />

  return (
    <ThemeContext.Provider
      value={{
        palette: state.palette,
        bg: state.bg,
        themes: state.themes,
        infoFooter: state.infoFooter,
        EditPalette,
        SaveChange
      }}
    >
      <MuiThemeProvider theme={{
        ...themeDefault,
        palette: {
          ...createMuiTheme().palette,
          ...state.palette
        }
      }}>
        <CssBaseline />
        <Global
          styles={css`
            :root {
                --primary: ${state.palette.primary.main};
                --primary-dark: ${state.palette.primary.dark};
                --primary-light: ${state.palette.primary.light};
                --contrastText: ${state.palette.primary.contrastText};
                --secondary: ${state.palette.secondary.main};
                --secondary-dark: ${state.palette.secondary.dark};
                --secondary-light: ${state.palette.secondary.light};
                --error: ${state.palette.error.main};
                --warning: ${state.palette.warning.main};
                --info: ${state.palette.info.main};
                --success: ${state.palette.success.main};
                --divider: ${state.palette.divider};
            }
  
            html {
              font-size: 100%;
              box-sizing: border-box;
            }
  
            *,
            *:before,
            *:after {
              box-sizing: inherit;
            }
  
            /* width */
            ::-webkit-scrollbar {
              width: 5px;
            }
  
            /* Track */
            ::-webkit-scrollbar-track {
              background: var(--divider);
            }
  
            /* Handle */
            ::-webkit-scrollbar-thumb {
              background: var(--primary);
              border-radius: 2px;
            }
  
            /* Handle on hover */
            ::-webkit-scrollbar-thumb:hover {
              background: var(--primary-dark);
            }
  
            .MuiDialogTitle-root {
              background-color: var(--primary);
              color: #fff;
              text-transform: uppercase;
            }
          `}
        />
        <Head>
          <title>Anuario Estadístico</title>
          <meta name="description" content="Sitio wed de anuario estadístico" />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
            integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w=="
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;1,700&family=Roboto:wght@400;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  )
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default ThemeProvider
