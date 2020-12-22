import React from 'react';
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import EditorLayout from '../../Layout/editor';
import AlertContext from '../../contexts/alert';
import EditorContext from '../../contexts/editor';

describe('Pruebas en EditorLayout', () => {
    const children = (<p><b>Testing</b> Pruebas</p>)
    const onSave = jest.fn();
    const onChangeTitle = jest.fn();
    const showMessage = jest.fn();
    const onCreateFile = jest.fn();

    const wrapper = mount(
        <AlertContext.Provider value={{
            showMessage
        }}>
            <EditorContext.Provider value={{
                title: 'Testo de prueba',
                onCreateFile
            }}>
                <EditorLayout
                    children={children}
                    onSave={onSave}
                    onChangeTitle={onChangeTitle}
                />
            </EditorContext.Provider>
        </AlertContext.Provider>

    )

    test('debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    })

    test('debe de llamar la función onSave()', () => {
        wrapper.find('.componente-onsave').at(6).prop('onClick')()

        expect(onSave).toHaveBeenCalled();
        expect(onSave).toHaveBeenCalledTimes(1);

    })

    test('debe llamar la función onChangeTitle()', () => {
        wrapper.find('form').at(1).prop('onSubmit')({ preventDefault() { } });

        expect(onChangeTitle).toHaveBeenCalled();
        expect(onChangeTitle).toHaveBeenCalledTimes(1);
    })


    test('debe llamar la función onCreateFile()', () => {
        wrapper.find('.id-field-text').at(0).prop('onClick')()

        expect(onCreateFile).toHaveBeenCalled();
        expect(onCreateFile).toHaveBeenCalledTimes(1);
    })

    
})
