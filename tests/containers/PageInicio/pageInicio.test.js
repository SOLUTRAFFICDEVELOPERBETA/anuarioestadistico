import React from 'react'
import '@testing-library/jest-dom';
import { shallow } from 'enzyme';
import PageInicio from '../../../containers/pageInicio';
import { fields } from '../../fixtures';

describe('Prueba en <PageInicio/>', () => {
    const wrapper = shallow(
        <PageInicio
            fields={fields}
        />
    )
    test('debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    })

    test('la imagen debe mostrarse correctamente', () => {
        const img = wrapper.find('img');
        expect(img.prop('src')).toBe(fields[4].value.url);
    })
})