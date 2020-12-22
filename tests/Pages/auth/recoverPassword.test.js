import React from 'react';
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { RouterContext } from 'next/dist/next-server/lib/router-context'
import RecoverPassword from '../../../pages/auth/recoverPassword';
import AuthContext from '../../../contexts/auth';
import AlertContext from '../../../contexts/alert';
import ThemeContext from '../../../contexts/theme';
import { act } from '@testing-library/react';

describe('Pruebas en <RecoverPassword/>', () => {
    const showMessage = jest.fn();
    const passwordReset = jest.fn();
    const bg = {
        name: 'imagen prueba',
        path: '/img/prueba.png',
        url: 'https://www.valladolid.mx/assets/img/default.jpg'
    }
    const router = {
        pathname: '/',
        route: '',
        basePatch: '',
        query: {},
        asPath: '',
        push: jest.fn(),
        replace: jest.fn(),
        reload: jest.fn(),
        back: jest.fn(),
        prefetch: jest.fn(),
        beforePopState: jest.fn(),
        listen: jest.fn(),
        isFallback: false,
        events: {
            on: jest.fn(),
            off: jest.fn(),
            emit: jest.fn(),
        },
    }
    const wrapper = mount(
        <RouterContext.Provider value={router}>
            <AlertContext.Provider value={{
                showMessage
            }}>
                <AuthContext.Provider value={{
                    passwordReset
                }}>
                    <ThemeContext.Provider value={{
                        bg
                    }}>
                        <RecoverPassword />
                    </ThemeContext.Provider>
                </AuthContext.Provider>
            </AlertContext.Provider>
        </RouterContext.Provider>
    )

    test('debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    })

    test('No de bebe llamar la función passwordReset()', ()=> {
        wrapper.find('form').prop('onSubmit')({ preventDefault() { } });

        expect(passwordReset).not.toHaveBeenCalled();
        expect(passwordReset).toHaveBeenCalledTimes(0);
    })

    test('debe llamar la función passwordReset() y redireccionar  /auth', () => {
        const email = 'tuberquia2115@gmail.com'
        wrapper.find('input').simulate('change', { target: { value: email } });

        act(() => {
            wrapper.find('form').prop('onSubmit')({ preventDefault() { } });
        })

        expect(passwordReset).toHaveBeenCalled();
        expect(passwordReset).toHaveBeenCalledTimes(1);
        expect(router.push).toHaveBeenCalledWith('/auth');
    })
})