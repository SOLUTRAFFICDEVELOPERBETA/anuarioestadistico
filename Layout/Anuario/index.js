import React from 'react';
import PropTypes from 'prop-types';

/**
 * @description Layout que permite mostrar los componentes con una campa principal
 * @param {Any} children 
 */
const AnuarioEstadistico = ({ children }) => {
   
    
    return (
        <div>
           
            <div>{children}</div>
        </div>
    );
};

AnuarioEstadistico.propTypes = {
    children: PropTypes.any
};
export default AnuarioEstadistico;
