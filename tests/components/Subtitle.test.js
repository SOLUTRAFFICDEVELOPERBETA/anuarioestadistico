import React from 'react';
import '@testing-library/jest-dom';
import { shallow } from 'enzyme';
import Subtitle from '../../components/Subtitle';

describe('Pruebas en el componente <Subtitle/>', () => {
   
    const wrapper = shallow(
        <Subtitle
            primary={"Texto primario de prueba"}
            secondary={"Texto secundario de prueba"}
        />

    )

    test('debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('debe llamar la función onOver()', () => {
        expect(wrapper.find('WithStyles(ForwardRef(Typography))').at(0).text().trim()).toBe('Texto primario de prueba')
        expect(wrapper.find('WithStyles(ForwardRef(Typography))').at(1).text().trim()).toBe('Texto secundario de prueba')
    })


})