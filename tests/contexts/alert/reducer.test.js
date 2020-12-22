import '@testing-library/jest-dom';
import { act } from '@testing-library/react-hooks';
import AlertReducer from '../../../contexts/alert/reducer';


describe('Pruebas en AlertReducer', () => {
    const initial = {
        message: null
    }
    test('debe de retornar el estado por defecto', () => {
        const state = AlertReducer(initial, {});
        expect(state).toEqual(initial);

    })

    test('debe de mostrar el alert con el mensaje con los argumentos enviados', () => {
        const payload = {
            text: 'Hola esto es un mensaje',
            category: 'warning',
            time: 5000
        }
        const action = {
            type: 'SHOW_ALERT',
            payload: payload
        }
        const state = AlertReducer(initial, action);
        expect(state.message).toEqual(payload);
    })

    test('debe de cerrar el componente de alert', () => {
        act(() => {
            const payload = {
                text: 'Hola esto es un mensaje',
            }
            const action = {
                type: 'SHOW_ALERT',
                payload: payload
            }
            AlertReducer(initial, action);
        })

        const action = {
            type: 'CLOSE_ALERT',
        }
        const state = AlertReducer(initial, action)

        expect(state).toEqual(initial);
    })
})
