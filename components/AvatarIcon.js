/* eslint-disable indent */
import React from 'react';
import {
    Avatar,
    makeStyles,
    Popover,
    List,
    ListItem,
    ListItemText,
    Button,
    ListItemIcon
} from '@material-ui/core';
import { AccountBoxTwoTone, ExitToApp } from '@material-ui/icons';
import { PROFILE_IMG } from '../constants';
import moment from 'moment';
import { useRouter } from 'next/router';
import AuthContext from '../contexts/auth';

const useStyles = makeStyles((theme) => ({
    avatar: {
        width: theme.spacing(3),
        height: theme.spacing(3),
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.light
    },
    button: {
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.contrastText,
        '&:hover': {
            backgroundColor: theme.palette.primary.contrastText
        }
    }
}));

/**
 * @description Componente que se encarga de mostrar la img del usuario y permite un despliegue de métodos. para cerrar sesión, e iniciar sesión y visualizar el perfil del usuario.
 * Consulte los elementos utilizados en {@link https://material-ui.com/ | Material-ui}
 */
const AvatarIcon = () => {
    const router = useRouter();
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { user, onLogOut } = React.useContext(AuthContext);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const auth = Boolean(user);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <React.Fragment>
            {auth ? (
                <Button
                    color="primary"
                    className={classes.button}
                    variant="contained"
                    onClick={handleClick}
                    endIcon={
                        <Avatar
                            className={classes.avatar}
                            alt="img-user"
                            src={user && user.avatar ? user.avatar.url : PROFILE_IMG}
                        />
                    }>
                    {moment().format('ll')}
                </Button>
            ) : (
                <Button
                    color="inherit"
                    variant="outlined"
                    size="small"
                    onClick={() => router.push('/auth')}>
                    iniciar sesión
                </Button>
            )}
            {open && (
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}>
                    <List>
                        <ListItem  dense button onClick={() => router.push('/')}>
                            <ListItemIcon>
                                <AccountBoxTwoTone color="primary" />
                            </ListItemIcon>
                            <ListItemText primary="Perfil" />
                        </ListItem>
                        <ListItem dense button onClick={onLogOut}>
                            <ListItemIcon>
                                <ExitToApp color="primary" />
                            </ListItemIcon>
                            <ListItemText primary="Cerrar Sesión" />
                        </ListItem>
                    </List>
                </Popover>
            )}
        </React.Fragment>
    );
};

export default AvatarIcon;
