import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import React from 'react';
import { RouterContext } from 'next/dist/next-server/lib/router-context'
import AvatarIcon from '../../components/AvatarIcon';
import { PROFILE_IMG } from '../../constants';
import AuthContext from '../../contexts/auth';
import { user } from '../fixtures'


describe('Pruebas en <AvatarIcon/>', () => {
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

    const onLogOut = jest.fn(() => { });
    test('debe mostrarse correctamente', () => {
        const wrapper = mount(
            <AuthContext.Provider value={{
                user,
                onLogOut,

            }}>
                <AvatarIcon />
            </AuthContext.Provider>
        )
        expect(wrapper).toMatchSnapshot();
    });

    test('debe mostrar el componente de <avatar/> y <Button/>', () => {
        const wrapper = mount(
            <AuthContext.Provider value={{
                user,
                onLogOut,

            }}>
                <AvatarIcon />
            </AuthContext.Provider>
        )
        expect(wrapper.find('button').exists()).toBe(true);
        expect(wrapper.find('img').prop('src').trim()).toBe(PROFILE_IMG);


    });

    test('debe mostrar el componente <Tooltip/> y <IconButton/> de iniciar sesión y llamar la función useRouter()', () => {
        const wrapper = mount(
            <AuthContext.Provider value={{
                user: null,
                onLogOut,

            }}>
                <RouterContext.Provider value={router}>
                    <AvatarIcon />
                </RouterContext.Provider>
            </AuthContext.Provider>
        )


        expect(wrapper.find('button').text().trim()).toBe('iniciar sesión');
        expect(wrapper.find('button').hasClass('MuiButton-colorInherit')).toBe(true);
        wrapper.find('button').prop('onClick')();
        expect(router.push).toHaveBeenCalledWith('/auth')


    })

    test('debe mostrar el componente <Popover/>', () => {
        const wrapper = mount(
            <AuthContext.Provider value={{
                user,
                onLogOut,


            }}>
                <RouterContext.Provider value={router}>
                    <AvatarIcon />
                </RouterContext.Provider>
            </AuthContext.Provider>
        )
        wrapper.find('button').simulate('click', { currentTarget: () => { } });

        expect(wrapper.find('ul').exists()).toBe(true);
        expect(wrapper.find('span').at(3).text().trim()).toBe('Perfil')
        expect(wrapper.find('span').at(5).text().trim()).toBe('Cerrar Sesión');


    })
})