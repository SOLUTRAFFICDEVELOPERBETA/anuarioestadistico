import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';

// Hook que permite la utilización sencilla de Diálogos
const useDialog = () => {
    const [open, setOpen] = React.useState(false);

    // Método para manejar la apertura y el cierre del dialogo
    const handleToggle = () => setOpen(!open);

    /**
     * Componente contenedor del Dialogo
     * @param {{ title: string, children: any, actions: any }} props Propiedades del componente
     */
    const DialogContainer = ({ title, children, actions }) =>
        open ? (
            <Dialog open={open} onClose={() => setOpen(false)}>
                {title && <DialogTitle>{title}</DialogTitle>}
                <DialogContent>{children}</DialogContent>
                {actions && <DialogActions>{actions}</DialogActions>}
            </Dialog>
        ) : null;

    DialogContainer.propTypes = {
        title: PropTypes.string,
        children: PropTypes.node.isRequired,
        actions: PropTypes.node.isRequired
    };

    return [handleToggle, DialogContainer];
};

export default useDialog;
