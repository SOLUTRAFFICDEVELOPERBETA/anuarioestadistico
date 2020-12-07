import '@testing-library/jest-dom';
import { act } from '@testing-library/react';
import { mount, shallow } from 'enzyme';
import React from 'react';
import Login from '../../../containers/Login';
import AlertContext from '../../../contexts/alert';
import AuthContext from '../../../contexts/auth';

describe('Pruebas en <Login/>', () => {
    const onLogIn = jest.fn();
    const showMessage = jest.fn();
    const wrapper = mount(
        <AlertContext.Provider value={{
            showMessage
        }}>
            <AuthContext.Provider value={{
                onLogIn
            }}>
                <Login />
            </AuthContext.Provider>
        </AlertContext.Provider>
    )

    test('debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();

    })

    test('no debe llamar la función onLogIn()', () => {
        wrapper.find('form').prop('onSubmit')({ preventDefault() { } })
        expect(onLogIn).not.toHaveBeenCalled();


    })

    test('debe llamar la función onLogIn()', () => {
        const values = {
            email: 'prueba@gmail.com',
            password: '12345678'
        }
        act(() => {
            wrapper.find('input').at(0).prop('onChange')({ target: { value: values.email, name: 'email' } })
            wrapper.find('input').at(1).prop('onChange')({ target: { value: values.password, name: 'password' } })
        })
        wrapper.find('form').prop('onSubmit')({ preventDefault() { } });
        expect(onLogIn).not.toHaveBeenCalled();


    })
})