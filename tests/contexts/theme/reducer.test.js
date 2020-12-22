import '@testing-library/jest-dom';
import theme from '../../../config/theme';
import { THEMES } from '../../../constants/options';
import ThemeReducer from '../../../contexts/theme/reducer';

describe('Pruebas en ThemeReducer', () => {

    const initialState = {
        palette: theme.palette,
        bg: {
            name: 'background',
            url: '',
            path: ''
        },
        themes: THEMES,
        infoFooter: {}

    }

    test('debe retornar el estado por defecto', () => {
        const state = ThemeReducer(initialState, {});
        expect(state).toEqual(initialState);
    })

    test('debe obtener la información del theme ', () => {
        const payload = {
            palette: theme.palette,
            bg: {
                name: 'background',
                url: '',
                path: ''
            },
            themes: THEMES,
            infoFooter: {}

        }
        const action = {
            type: 'GET_THEME',
            payload
        }
        const state = ThemeReducer(initialState, action);
        expect(state).toEqual(payload);
    })

    test('debe de editar la información de la paleta ', () => {
        const initialState = {
            palette: theme.palette,
            bg: {
                name: 'background',
                url: '',
                path: ''
            },
            themes: THEMES,
            infoFooter: {}
        }

        const action = {
            type: 'EDIT_PALETTE',
            payload: THEMES[0].palette
        }
        const state = ThemeReducer(initialState, action);
        expect(state.palette).toEqual(THEMES[0].palette);
    })

    test('debe obtener la información de la paleta ', () => {
        const action = {
            type: 'GET_PALETTE',
            payload: THEMES[1].palette
        }
        const state = ThemeReducer(initialState, action);
        expect(state.palette).toEqual(THEMES[1].palette);
    })

    test('debe cambiar el estado por defecto sin hay un error ', () => {

        const action = {
            type: 'THEME_ERROR',
        }
        const state = ThemeReducer(initialState, action);
        expect(state).toEqual(initialState);
    })
})