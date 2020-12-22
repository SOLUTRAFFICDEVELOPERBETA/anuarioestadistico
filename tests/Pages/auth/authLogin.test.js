import React from 'react';
import '@testing-library/jest-dom';
import { shallow } from 'enzyme';
import AuthLogin from '../../../pages/auth';

describe('Pruebas en <AuthLogin/>', ()=> {

    const wrapper = shallow(
        <AuthLogin
        />
    )

    test('debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    })

    test('debe mostrar el componente <LogInForm/>', ()=> {
        expect(wrapper.find('LogInForm').exists()).toBe(true);
    })
})