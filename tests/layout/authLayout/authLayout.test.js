import React from 'react';
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import AuthLayout from '../../../Layout/authLayout';
import ThemeContext from '../../../contexts/theme';

describe('Pruebas en AuthLayout', () => {
    const children = (<p><b>Dios</b> es amor</p>)
    const bg = {
        name: 'imagen prueba',
        path: '/img/prueba.png',
        url: 'https://www.valladolid.mx/assets/img/default.jpg'
    }
    const wrapper = mount(
        <ThemeContext.Provider value={{
            bg
        }}>
            <AuthLayout
                children={children}
            />
        </ThemeContext.Provider>
    )

    test('debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    })

    test('debe de mostrar la información del children', () => {
        expect(wrapper.find('p').html()).toBe('<p><b>Dios</b> es amor</p>')
    })
})
