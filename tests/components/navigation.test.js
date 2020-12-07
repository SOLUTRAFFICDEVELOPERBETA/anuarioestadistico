import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import React from 'react';
import Router from 'next/router';
import { RouterContext } from 'next/dist/next-server/lib/router-context'
import Navegacion from '../../components/navigation';
import AuthContext from '../../contexts/auth';
import { user } from '../fixtures';

describe('Pruebas en <Navegacion/>', () => {
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
    Router.router = router;
    const onLogOut = jest.fn();
    const wrapper = mount(
        <AuthContext.Provider value={{
            auth: 't0qnOa2EpoOcPeZ1qCYs0lypggi1',
            user,
            onLogOut

        }}>
            <RouterContext.Provider value={Router}>
                <Navegacion />
            </RouterContext.Provider>
        </AuthContext.Provider>

    )

    jest.mock('next/link', () => {
        return ({ children }) => {
            return children;
        }
    })
    test('Debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    })

    test('debe mostrar el nombre correctamente', () => {
        expect(wrapper.find('a').at(0).text().trim()).toBe(user.name)
    })

    test('debe funcionar el renderizada /', () => {
        // wrapper.find('a').at(1).prop('onClick')({
        //     preventDefault(){},
        //     currentTarget: {
        //         nodeName: ''
        //     }
        // })

    })

    test('debe llamar la función de cerrar sesión', () => {
        wrapper.find('img').prop('onClick')()

        expect(wrapper.find('img').prop('src')).toBe('/static/icons/salida.svg');
        expect(onLogOut).toHaveBeenCalled();
        expect(onLogOut).toHaveBeenCalledTimes(1);

    })

    test('debe mostrar el botón de inicio de sesión', () => {
        const wrapper = mount(
            <AuthContext.Provider value={{
                auth: '',
                user,
                onLogOut

            }}>
                <RouterContext.Provider value={router}>
                    <Navegacion />
                </RouterContext.Provider>
            </AuthContext.Provider>

        )
        expect(wrapper.find('img').prop('src')).toBe('/static/icons/login.svg');
    })
})