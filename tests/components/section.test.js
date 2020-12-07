import '@testing-library/jest-dom';
import { shallow } from 'enzyme';
import React from 'react';
import SectionGeneric from '../../components/section';

describe('Pruebas en el componente <SectionGeneric/>', () => {

    const wrapper = shallow(
        <SectionGeneric
            type={'title'}
            value={"titulo de prueba"}
            id={'id-title'}

        />
    )

    test('debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('debe mostrar correctamente el componente dependiendo del argumento que se le envía', () => {
        expect(wrapper.find('EmotionCssPropInternal').at(2).text().trim()).toBe('titulo de prueba');

    })

})