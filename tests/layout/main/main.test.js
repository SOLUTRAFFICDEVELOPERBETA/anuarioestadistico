import React from 'react';
import '@testing-library/jest-dom';
import { shallow } from 'enzyme';
import Navigator from '../../../Layout/main';

describe('Pruebas en Navigator', () => {
    const children = (<p><b>Testing</b> Pruebas</p>)
    const wrapper = shallow(
        <Navigator
            children={children}
        />

    )

    test('debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    })

    test('debe de mostrar la información del children', () => {
        expect(wrapper.find('p').html()).toBe('<p><b>Testing</b> Pruebas</p>')
    })

    test('debe de mostrar los componentes <Header/> y <MainFooter/>', ()=> {
        const header = wrapper.find('Header');
        const footer = wrapper.find('MainFooter');

        expect(header.exists()).toBe(true);
        expect(footer.exists()).toBe(true);
    })
})
