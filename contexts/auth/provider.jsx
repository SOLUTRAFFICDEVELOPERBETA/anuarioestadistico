import React from 'react';
import PropTypes from 'prop-types';
import AuthContext from '.';
import AuthReducer from './reducer';
import AlertContext from '../alert';
import moment from 'moment'
import fb from '../../config/firebase';
import { useRouter } from 'next/router';
import { LOG_IN, AUTH_ERROR, AUTH_STATE, GET_USER, LOG_OUT, REGISTER_USER_EXIT } from '../../constants/types';

const AuthProvider = ({ children }) => {
    const initial = {
        auth: null,
        user: null
    };

    const router = useRouter();
    const [state, dispatch] = React.useReducer(AuthReducer, initial);
    const { showMessage } = React.useContext(AlertContext);

    /**
     *  Función que permite realizar el registro de un usuario
     * @param {data: any} props Propiedades del componente
     */
    const registerUser = async (data) => {

        const body = {
            name: data.name,
            nameUser: data.nameUser,
            email: data.email,
            role: 'admin',
            dateCreate: moment().valueOf()
        }
        try {
            const userCreate = await fb.auth.createUserWithEmailAndPassword(data.email, data.password)
            userCreate.user.updateProfile({ displayName: data.name })
            await fb.db.collection('users').doc(userCreate.user.uid).set(body).then(() => {
                dispatch({
                    type: REGISTER_USER_EXIT
                })
                showMessage('Usuario registrado exitosamente', 'success')
                router.push('/')
            })
        } catch (error) {
            showMessage(error.message, 'error')
        }
    }
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

    /**
     * @description Método para cambiar recuperar la contraseña
     * @param {String} email 
     */


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

    /**
     * @description Método para cerrar sesión
     */

    const onLogOut = async () => {
        try {
            await fb.auth
                .signOut()
                .then(() => {
                    dispatch({
                        type: LOG_OUT
                    });
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
                passwordReset,
                registerUser
            }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default AuthProvider;
