import React from 'react';
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import AuthContext from '../../../contexts/auth';
import AlertContext from '../../../contexts/alert';
import ThemeContext from '../../../contexts/theme';
import Register from '../../../pages/auth/register';

describe('Pruebas en <Register/>', () => {
    const showMessage = jest.fn();
    const registerUser = jest.fn();
    const bg = {
        name: 'imagen prueba',
        path: '/img/prueba.png',
        url: 'https://www.valladolid.mx/assets/img/default.jpg'
    }
    const wrapper = mount(

        <AlertContext.Provider value={{
            showMessage
        }}>
            <AuthContext.Provider value={{
                registerUser
            }}>
                <ThemeContext.Provider value={{
                    bg
                }}>
                    <Register />
                </ThemeContext.Provider>
            </AuthContext.Provider>
        </AlertContext.Provider>

    )

    test('debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    })

    test('No de bebe llamar la función registerUser()', () => {
        wrapper.find('form').prop('onSubmit')({preventDefault(){}});

        expect(registerUser).not.toHaveBeenCalled();
        expect(registerUser).toHaveBeenCalledTimes(0);
    })

})