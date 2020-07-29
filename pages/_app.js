/* eslint-disable no-unused-vars */
import React from 'react'
import App from 'next/app'
import PropTypes from 'prop-types'
import Layout from '../Layout'
import AlertProvider from '../contexts/alert/provider'
import AuthProvider from '../contexts/auth/provider'


const MyApp = ({ Component, pageProps }) => {
    return (
        <AlertProvider>
            <AuthProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </AuthProvider>
        </AlertProvider>


    )
}
MyApp.propTypes = {
    Component: PropTypes.any.isRequired,
    pageProps: PropTypes.object.isRequired
}

export default MyApp