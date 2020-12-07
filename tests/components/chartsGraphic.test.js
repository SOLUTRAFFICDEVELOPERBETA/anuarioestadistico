import '@testing-library/jest-dom';
import { mount, shallow } from 'enzyme';
import React from 'react';
import ChartGraphic from '../../components/chartsGraphic';
import { demoDataGraphic } from '../fixtures';

describe('Pruebas en <ChartGraphic/>', () => {
    const wrapper = mount(
        <ChartGraphic
            id={"chart-Prueba"}
            value={demoDataGraphic}

        />
    )
    test('debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    })

    test('debe existir el componente de default', ()=> {
        expect(wrapper.find('div').at(0).hasClass('MuiBox-root MuiBox-root-1')).toBe(true)
    })
})