import '@testing-library/jest-dom';
import { shallow } from 'enzyme';
import React from 'react';
import ImagBackground from '../../components/imgBackground';

describe('Pruebas en <ImagBackground/>', () => {
    const wrapper = shallow(

        <ImagBackground
            title="Titulo de prueba"
            imgSrc="https://increasify.com.au/wp-content/uploads/2016/08/default-image.png"
            subTitle="Subtitle de prueba"
        />

    )

    test('Debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    })

    test('debe mostrar la imagen enviada', () => {
        expect(wrapper.find('img').prop('src')).toBe('https://increasify.com.au/wp-content/uploads/2016/08/default-image.png');

        expect(wrapper.find('WithStyles(ForwardRef(Typography))').at(0).text().trim()).toBe('Titulo de prueba')
        expect(wrapper.find('WithStyles(ForwardRef(Typography))').at(1).text().trim()).toBe('Subtitle de prueba')
    });

   
})