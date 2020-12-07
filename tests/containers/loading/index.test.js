import '@testing-library/jest-dom';
import { shallow } from 'enzyme';
import React from 'react';
import LoadingContainer from '../../../containers/loading';

describe('Pruebas en <LoadingContainer/>', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<LoadingContainer />)
    })
    test('debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();

    })

    test('debe mostrarse correctamente cuando se le pasa el argumento message', () => {
        const message = "prueba de texto"
        wrapper = shallow(<LoadingContainer message={message} />)
        expect(wrapper.find('WithStyles(ForwardRef(Typography))').text().trim()).toBe(message)
       

    })
})