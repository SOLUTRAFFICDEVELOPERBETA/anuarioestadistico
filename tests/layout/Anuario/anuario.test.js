import React from 'react';
import '@testing-library/jest-dom';
import { shallow } from 'enzyme';
import AnuarioEstadistico from '../../../Layout/Anuario';


describe('Pruebas en AnuarioEstadistico', () => {
    const children = (<p>Hijo del componente</p>)
    const wrapper = shallow(
        <AnuarioEstadistico children={children} />
    )
    test('debe de mostrar el componente correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    })

    test('debe de mostrar la estructura enviada', () => {
        const p = wrapper.find('p');
        expect(p.text().trim()).toBe('Hijo del componente');
    })
})