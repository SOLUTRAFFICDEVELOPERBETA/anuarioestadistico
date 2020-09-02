import React from 'react';
import { IconButton, makeStyles, Snackbar } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { green, red, deepOrange } from '@material-ui/core/colors';
import AlertContext from '../contexts/alert';

// Estilos del componente
const useStyles = makeStyles((theme) => ({
    root: {
        position: 'fixed',
        top: 0,
        left: 0,
        padding: theme.spacing(1.5),
        width: '100%',
        zIndex: 1600,

        [theme.breakpoints.down('md')]: {
            width: 'auto',
            height: 'fit-content',
            bottom: theme.spacing(2),
            right: theme.spacing(3),
            borderRadius: theme.spacing(1),
            left: 'auto',
            margin: theme.spacing(1, 0)
        }
    },
    message: {
        display: 'grid',
        alignItems: 'center',
        gridGap: theme.spacing(1)
    },
    success: {
        backgroundColor: green[500],
        // border: `2px solid ${theme.palette.success.main}`,
        color: theme.palette.getContrastText(green[500])
    },
    error: {
        backgroundColor: red[500],
        // border: `2px solid ${theme.palette.success.main}`,
        color: theme.palette.getContrastText(red[500])
    },
    warning: {
        backgroundColor: deepOrange[500],
        // border: `2px solid ${theme.palette.success.main}`,
        color: theme.palette.getContrastText(deepOrange[500])
    }
}));

const AlertMessage = () => {
    const classes = useStyles();
    const { closeMessage } = React.useContext(AlertContext);

    return (
        <AlertContext.Consumer>
            {({ message }) =>
                message ? (
                    <Snackbar
                        open={Boolean(message)}
                        autoHideDuration={message.time}
                        onClose={closeMessage}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center'
                        }}
                        ContentProps={{
                            classes: {
                                root: classes[message.category],
                                message: classes.message
                            }
                        }}
                        message={message.text}
                        action={
                            <React.Fragment>
                                <IconButton size="small" color="inherit" onClick={closeMessage}>
                                    <Close fontSize="small" />
                                </IconButton>
                            </React.Fragment>
                        }
                    />
                ) : null
            }
        </AlertContext.Consumer>
    );
};

export default AlertMessage;
