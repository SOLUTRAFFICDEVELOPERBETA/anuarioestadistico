import '@testing-library/jest-dom';
import { shallow } from 'enzyme';
import React from 'react';
import { MenuTabsMain } from '../../components/menuDropdown';
import {LinksMenu} from '../../constants'

describe('Pruebas en <MenuTabsMain/>', () => {
    const wrapper = shallow(

        <MenuTabsMain
            data={LinksMenu}
        />

    )

    test('Debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    })

    test('debe retornar los componentes de la rutas', () => {
        expect(wrapper.find('Component').exists()).toBe(true)
       
    });

    test('debe de  devolver los 16 módulos del anuario estadístico', ()=> {
        expect(wrapper.find('TabPanel').at(15).exists()).toBe(true);
    })

   
})