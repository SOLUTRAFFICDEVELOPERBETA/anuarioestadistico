import '@testing-library/jest-dom';
import { act } from '@testing-library/react';
import PagesReducer from '../../../contexts/pagess/reducer';

import { pagesTest } from '../../fixtures';

describe('Pruebas en PagesReducer', () => {

    const initialState = {
        pages: null,
        error: null
    };

    test('debe retornar el estado por defecto', () => {
        const state = PagesReducer(initialState, {});
        expect(state).toEqual(initialState);
    })

    test('debe obtener las páginas', () => {
        const payload = pagesTest;
        const action = {
            type: 'GET_PAGES',
            payload
        }
        const state = PagesReducer(initialState, action);
        expect(state.pages).toEqual(payload);
    })

    test('debe mostrar error el false', () => {
        const action = {
            type: 'GET_PAGES_ERROR'
        }
        const state = PagesReducer(initialState, action)
        expect(state.error).toBe(false);
    })
})