import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import Header from '../../components/header';
import MainFooter from '../../components/Footer';

const useSTyles = makeStyles(({
    root: {
        display: 'flex',
    }
}))
const Navigator = ({ children }) => {
    const classes = useSTyles()
    return (
        <div>
            <Header />
            <main>
                <div >
                    {children}
                </div>
            </main>
            <MainFooter />
        </div>
    );
}
Navigator.propTypes = {
    children: PropTypes.any
}
export default Navigator