import React from 'react';
import '@testing-library/jest-dom';
import { mount, shallow } from 'enzyme';
import ComercioExterior from '../../../Layout/Anuario/comercioExterior';
import PagesContext from '../../../contexts/pagess';
import { pagesTest } from '../../fixtures';


describe('Pruebas en ComercioExterior', () => {

    const wrapper = mount(
        <PagesContext.Provider value={{
            pages: pagesTest
        }}>
            <ComercioExterior />
        </PagesContext.Provider>
    )
    test('debe de mostrar el componente correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    })

    test('debe retornar la información del modulo filtrado, dependiendo del tipo de campo', () => {
        expect(wrapper.find('h5').text().trim()).toBe('Valor de prueba')
    })

})