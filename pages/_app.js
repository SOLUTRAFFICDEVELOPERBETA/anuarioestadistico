/* eslint-disable no-unused-vars */
import React from 'react'
import App from 'next/app'
import PropTypes from 'prop-types'
import Layout from '../Layout'
import AlertProvider from '../contexts/alert/provider'
import AuthProvider from '../contexts/auth/provider'
import PagesProvider from '../contexts/pagess/provider'
import ThemeProvider from '../contexts/theme/provider'


const MyApp = ({ Component, pageProps }) => {
    return (
        <AlertProvider>
            <ThemeProvider>
                <AuthProvider>
                    <PagesProvider>
                            <Component {...pageProps} />
                    </PagesProvider>
                </AuthProvider>
            </ThemeProvider>
        </AlertProvider>


    )
}
MyApp.propTypes = {
    Component: PropTypes.any.isRequired,
    pageProps: PropTypes.object.isRequired
}

export default MyApp