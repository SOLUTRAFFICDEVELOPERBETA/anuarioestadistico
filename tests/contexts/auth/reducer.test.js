import '@testing-library/jest-dom';
import { act } from '@testing-library/react';
import AuthReducer from '../../../contexts/auth/reducer';

import { user } from '../../fixtures';

describe('Pruebas en AuthReducer', () => {
    const stateInitial = {
        auth: null,
        user: null
    };
    test('debe retornar el estado por defecto', () => {

        const state = AuthReducer(stateInitial, {});

        expect(state).toEqual(stateInitial);
    })

    test('debe obtener la información del usuario', () => {
        const payload = user;
        const action = {
            type: 'GET_USER',
            payload
        }
        const state = AuthReducer(stateInitial, action);
        expect(state.user).toEqual(payload);
    })

    test('debe obtener el auth=uid del usuario', () => {
        const payload = user.uid;
        const action = {
            type: 'AUTH_STATE',
            payload
        }
        const state = AuthReducer(stateInitial, action);
        expect(state.auth).toBe(user.uid);
    })

    test('debe obtener el auth=uid cuando el usuario inicie sessión', () => {
        const action = {
            type: 'LOG_IN',
            payload: user.uid
        }
        const state = AuthReducer(stateInitial, action);
        expect(state.auth).toBe(user.uid);
    })

    test('debe cerrar sesión del usuario y cambiar el estado por defecto', () => {
        act(() => {
            const action = {
                type: 'LOG_IN',
                payload: user.uid
            }
            AuthReducer(stateInitial, action);
        })

        const action = {
            type: 'LOG_OUT',

        }
        const state = AuthReducer(stateInitial, action);
        expect(state).toEqual(stateInitial);
    })
})