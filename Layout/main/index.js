import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import Header from '../../components/header';
import MainFooter from '../../components/Footer';

// Estilos del layout
const useSTyles = makeStyles(({
    root: {
        display: 'flex',
    }
}))
/**
 * @description Layout que permite renderizar eñ header y footer y el componente hijo que lo abrace
 * @param {any} children 
 */
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