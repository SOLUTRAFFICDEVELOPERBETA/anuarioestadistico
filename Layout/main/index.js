import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/header';
import MainFooter from '../../components/Footer';
/**
 * @description Layout que permite renderizar eñ header y footer y el componente hijo que lo abrace
 * @param {any} children 
 */
const Navigator = ({ children }) => {
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