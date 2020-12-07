import '@testing-library/jest-dom';
import { shallow } from 'enzyme';
import React from 'react';
import ButtonUploadCsv from '../../components/ButtonUploadCsv';

describe('Pruebas en <ButtonUploadCsv/>', () => {
    const handleFilesAnnex = jest.fn();
    const wrapper = shallow(
        <ButtonUploadCsv
            title="Titulo de prueba"
            handleFilesAnnex={handleFilesAnnex}
            name="img-pruebas"
            id={123}
            htmlFor={'mg-pruebas'}
        />
    );
    test('debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();


    })

    test('debe llamar la función handleFilesAnnex con los argumentos enviados ', () => {
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
        wrapper.find('input').simulate('change', parametros);
        expect(handleFilesAnnex).toHaveBeenCalledTimes(1);
        expect(handleFilesAnnex).toHaveBeenCalledWith(expect.any(Object));
        expect(handleFilesAnnex).toHaveBeenCalledWith(parametros.target.files);


    })
})