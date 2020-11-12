import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import { Global, css } from '@emotion/core';
import Header from '../components/header';
import theme from '../config/theme';

/**
 * Layout que permite configurar el tema la app y estilos, globales.
 * @param {children: any} Props Propiedades del Layout.
 */
const Layout = ({ children }) => {
    const state = theme;
    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <Global
                styles={css`
                    :root {
                        --primary: ${state.palette.primary.main};
                        --primary-dark: ${state.palette.primary.dark};
                        --primary-light: ${state.palette.primary.light};
                        --contrastText: ${state.palette.primary.contrastText};
                        --secondary: ${state.palette.secondary.main};
                        --error: ${state.palette.error.main};
                        --warning: ${state.palette.warning.main};
                        --success: ${state.palette.success.main};
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

                    body {
                        font-size: 1rem !important;
                        line-height: 3 !important;
                        font-family: 'Lato', sans-serif;
                    }

                    ul {
                        list-style: none;
                        margin: 0;
                        padding: 0;
                    }
                    .contenedor {
                        max-width: 120rem;
                        margin: 0 auto;
                        width: 95%;
                    }
                    img {
                        max-width: 100%;
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
            <Header />
            {children}
        </MuiThemeProvider>
    );
};

Layout.propTypes = {
    children: PropTypes.any
};
export default Layout;
