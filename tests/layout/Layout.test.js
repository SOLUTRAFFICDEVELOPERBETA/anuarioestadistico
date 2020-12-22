import React from 'react';
import '@testing-library/jest-dom';
import {  shallow } from 'enzyme';
import Layout from '../../Layout';

describe('Pruebas en <Layout/>', () => {
    const children = (<p>Prueba de testing</p>)
    const wrapper = shallow(
        <Layout
            children={children}
        />
    )
    test('debe mostrarse correctamente', ()=> {
        expect(wrapper).toMatchSnapshot();
    })

    test('debe de mostrar el children correctamente', () => {
        expect(wrapper.find('p').html()).toBe('<p>Prueba de testing</p>')
    })

    test('debe de mostrar los componentes <Header/>', ()=> {
        const header = wrapper.find('Header');
        expect(header.exists()).toBe(true);
        
    })
})