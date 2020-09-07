import React from 'react';
import PropTypes from 'prop-types';
import AuthContext from '.';
import AuthReducer from './reducer';
import AlertContext from '../alert';
import fb from '../../config/firebase';
import { useRouter } from 'next/router';
import { LOG_IN, AUTH_ERROR, AUTH_STATE, GET_USER, LOG_OUT } from '../../constants/types';

const AuthProvider = ({ children }) => {
    const initial = {
        auth: null,
        user: null
    };

    const router = useRouter();
    const [state, dispatch] = React.useReducer(AuthReducer, initial);
    const { showMessage } = React.useContext(AlertContext);

    /**
     * Método de inicio de sesión
     * @param {string} email Correo del usuario
     * @param {string} password Contraseña del usuario
     */
    const onLogIn = (email, password) => {
        try {
            fb.auth
                .signInWithEmailAndPassword(email, password)
                .then((ref) => {
                    const { uid } = ref.user;
                    showMessage('Bienvenido', 'success');
                    dispatch({
                        type: LOG_IN,
                        payload: uid
                    });
                    router.push('/');
                })
                .catch((error) => {
                    showMessage(error.message, 'error');
                    dispatch({
                        type: AUTH_ERROR
                    });
                });
        } catch (error) {
            console.log(error);
        }
    };

    // Método para cambiar recuperar la contraseña

    const passwordReset = async (email) => {
        try {
            await fb.auth.sendPasswordResetEmail(email).then(() => {
                showMessage(
                    'Se envío un correo electrónico al correo para restauración de la contraseña'
                );
                router.push('/auth');
            });
        } catch (error) {
            console.log(error);
            showMessage(error.message, 'error');
        }
    };
    // Método para cerrar sesión
    const onLogOut = async () => {
        try {
            await fb.auth
                .signOut()
                .then(() => {
                    dispatch({
                        type: LOG_OUT
                    });
                    router.push('/auth');
                })
                .catch((e) => {
                    console.log('error', e);
                    showMessage(e.message, 'error');
                });
        } catch (error) {
            console.log('error', error);
            showMessage(error.message, 'error');
        }
    };

    /**
     * Función para cambiar la contraseña de la cuenta.
     * @param {string} email Correo del usuario
     * @param {string} old Contraseña actual
     * @param {string} password Nueva contraseña
     */
    const doChangePassword = async (email, old, password) => {
        try {
            const user = await fb.auth.currentUser;
            const credentials = await fb._auth.EmailAuthProvider.credential(email, old);

            if (!credentials) {
                showMessage('Usuario o contraseñas no validos', 'error');
                return;
            }

            await user.reauthenticateWithCredential(credentials).catch((res) => {
                showMessage(res.message, 'error');
            });
            await user
                .updatePassword(password)
                .then(() => {
                    showMessage('Contraseña cambiada con exito', 'success');
                })
                .catch((res) => {
                    console.log('error', res);
                    showMessage(res.message, 'error');
                });
        } catch (error) {
            console.log('error', error);
            showMessage(error.message, 'error');
        }
    };
    React.useEffect(() => {
        const onCheckAuthState = () => {
            try {
                fb.auth.onAuthStateChanged(
                    (user) => {
                        console.log('esta es al data del user', user);
                        if (user) {
                            dispatch({
                                type: AUTH_STATE,
                                payload: user.uid
                            });
                            router.push('/');
                        }
                    },
                    (error) => {
                        showMessage(error.message, 'error');
                    },
                    (completed) => {
                        console.log('completed', completed);
                    }
                );
            } catch (error) {
                console.log(error);
                showMessage(error.message, 'error');
                dispatch({
                    type: AUTH_ERROR
                });
            }
        };
        return onCheckAuthState();
    }, []);

    React.useEffect(() => {
        const getUserInfo = () => {
            const { auth } = state;
            if (auth) {
                try {
                    fb.db
                        .collection('users')
                        .doc(auth)
                        .onSnapshot((doc) => {
                            const { role } = doc.data();
                            if (role === 'admin') {
                                dispatch({
                                    type: GET_USER,
                                    payload: doc.data()
                                });
                            } else {
                                showMessage('Usuario no admitido', 'error');
                                onLogOut();
                            }
                        });
                } catch (error) {
                    console.log('error', error);
                    showMessage(error.message, 'error');
                    onLogOut();
                }
            }
        };
        getUserInfo();
        // eslint-disable-next-line
  }, [state.auth])

    return (
        <AuthContext.Provider
            value={{
                auth: state.auth,
                user: state.user,
                onLogIn,
                onLogOut,
                doChangePassword,
                passwordReset
            }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default AuthProvider;
