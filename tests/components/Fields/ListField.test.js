import '@testing-library/jest-dom';
import { act } from '@testing-library/react';
import { mount } from 'enzyme';
import React from 'react';
import { RouterContext } from 'next/dist/next-server/lib/router-context'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import AlertContext from '../../../contexts/alert';
import ListField from '../../../components/Fields/ListField';
import { valueTypeArray } from '../../fixtures';


describe('Pruebas en <ListField/>', () => {
    
    const onDelete = jest.fn();
    const onChange = jest.fn();
    const showMessage = jest.fn();
    
    test('debe mostrarse correctamente', () => {
        const wrapper = mount(
            <DndProvider backend={HTML5Backend}>
                <AlertContext.Provider value={{
                    showMessage
                }}>
                    <ListField
                        id="id-ImageField"
                        value={valueTypeArray}
                        size={12}
                        onChange={onChange}
                        onDelete={onDelete}
                    />
                </AlertContext.Provider>
            </DndProvider>
        )
        expect(wrapper).toMatchSnapshot()
    });


    test('debe llamar la función onChange() ', () => {
        const wrapper = mount(
            <DndProvider backend={HTML5Backend}>
                <AlertContext.Provider value={{
                    showMessage
                }}>
                    <ListField
                        id="id-ImageField"
                        value={valueTypeArray}
                        size={12}
                        onChange={onChange}
                        onDelete={onDelete}
                    />
                </AlertContext.Provider>
            </DndProvider>
        )
        wrapper.find('div').at(4).prop('onBlur')({ target: { id: 1, textContent: 'lista 2 de prueba' } });

        expect(onChange).toHaveBeenCalled();
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith(expect.any(Object));
        expect(onChange).toHaveBeenCalledWith({
            value: ['lista 1']
        });
    })

    test('debe de llamar la función onDelete()', () => {
        const wrapper = mount(
            <DndProvider backend={HTML5Backend}>
                <AlertContext.Provider value={{
                    showMessage
                }}>
                    <ListField
                        id="id-ImageField"
                        value={valueTypeArray}
                        size={12}
                        onChange={onChange}
                        onDelete={onDelete}
                    />
                </AlertContext.Provider>
            </DndProvider>
        )
        act(() => {
            wrapper.find('div').at(0).prop('onContextMenu')({ preventDefault() { }, currentTarget(){}});
        })
        // expect(wrapper).toMatchSnapshot();
        // expect(wrapper.find(''))
        // console.log(wrapper.html());
    })

})