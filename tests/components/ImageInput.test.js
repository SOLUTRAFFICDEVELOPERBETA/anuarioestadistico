import '@testing-library/jest-dom';
import { shallow } from 'enzyme';
import React from 'react';
import ImageInput from '../../components/ImageInput';

describe('Pruebas en <ImageInput/>', () => {
    const onChange = jest.fn();
    const wrapper = shallow(

        <ImageInput
            label="Prueba subir img"
            value="https://increasify.com.au/wp-content/uploads/2016/08/default-image.png"
            onChange={onChange}
        />

    )

    test('Debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    })

    test('debe mostrar la imagen enviada', () => {
        expect(wrapper.find('img').prop('src')).toBe('https://increasify.com.au/wp-content/uploads/2016/08/default-image.png')
    });

    test('debe llamar la función de onChange() con el parámetro enviado ', () => {
        const parametros = {
            target: {
                files: [
                    {
                        file: 'https://www.antiagingya.com/es/wp-content/uploads/2015/01/img-default-autores.jpg',
                        name: 'imgDefault',
                        size: 343565667,
                        type: 'img',
                    }
                ]
            }
        }

        expect(wrapper.find('input').exists()).toBe(true);
        wrapper.find('input').simulate('change', parametros);

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith(expect.any(Object));
        expect(onChange).toHaveBeenCalledWith(parametros.target.files[0]);
    })
})