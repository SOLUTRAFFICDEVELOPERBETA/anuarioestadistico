import React from 'react';
import PropTypes from 'prop-types';
import AlertContext from '.';
import AlertReducer from './reducer';
import { SHOW_ALERT, CLOSE_ALERT } from '../../constants/types';
import AlertMessage from '../../components/AlertMessage';

// Proveedor del contexto de Alertar
const AlertProvider = ({ children }) => {
    const initial = {
        message: null
    };

    const [state, dispatch] = React.useReducer(AlertReducer, initial);

    /**
     * Función para mostrar una alerta
     * @param {string} text Mensaje a mostrar en la alerta
     * @param {"success" | "warning" | "error"} category Tipo del error
     * @param {number} time Tiempo de visualización de la alerta
     */
    const showMessage = (text, category = 'warning', time = 5000) => {
        dispatch({
            type: SHOW_ALERT,
            payload: { text, category, time }
        });
    };

    const closeMessage = () => {
        dispatch({
            type: CLOSE_ALERT
        });
    };
    return (
        <AlertContext.Provider
            value={{
                message: state.message,
                showMessage,
                closeMessage
            }}>
            <AlertMessage />
            {children}
        </AlertContext.Provider>
    );
};

AlertProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default AlertProvider;
