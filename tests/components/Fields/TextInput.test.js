import '@testing-library/jest-dom';
import { act } from '@testing-library/react';
import { mount } from 'enzyme';
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TextInput from '../../../components/Fields/TextInput';
import AlertContext from '../../../contexts/alert';

describe('Pruebas en <TextInput/>', () => {
    const onChange = jest.fn(() => { });
    const onDelete = jest.fn();
    const showMessage = jest.fn();
    const wrapper = mount(
        <DndProvider backend={HTML5Backend}>
            <AlertContext.Provider value={{
                showMessage
            }}>
                <TextInput
                    id={`id-${1}-Text-input`}
                    value={"contendido de prueba"}
                    type={"paragraph"}
                    color={"#000000"}
                    size={12}
                    align='start'
                    fontSize={14}
                    child={false}
                    disableGrid={false}
                    onChange={onChange}
                    onDelete={onDelete}
                />
            </AlertContext.Provider>
        </DndProvider>
    )
    test('debe mostrarse correctamente', () => {
       
        expect(wrapper).toMatchSnapshot();
    })

    test('debe llamar la función onChange()', () => {
        
        wrapper.find('span').at(1).prop('onBlur')({
            currentTarget: {
                innerText: 'innerText prueba de texto',
                localName: "span"
            }
        })

        expect(onChange).toHaveBeenCalled();
        expect(onChange).toHaveBeenCalledTimes(1);

    })


    test('debe mostrar el popover', () => {
        
        act(() => {
            wrapper.find('div').prop('onContextMenu')({
                preventDefault() { }, currentTarget: {
                    innerText: 'innerText de prueba nuevamente'
                }
            });
        })
        expect(wrapper).toMatchSnapshot();
       

    })
})