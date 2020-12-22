import '@testing-library/jest-dom';
import { shallow } from 'enzyme';
import React from 'react';
import Header from '../../components/header';

describe('Pruebas en <Header/>', () => {
    const wrapper = shallow(
        <Header />
    )

    test('Debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    })

    test('der redireccionar al / inicio', () => {
       wrapper.find('Link').simulate('click');

    })
})
