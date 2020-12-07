import '@testing-library/jest-dom';
import { act } from '@testing-library/react';
import { mount } from 'enzyme';
import React from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import IFrameField from '../../../components/Fields/IFrameField';
import AlertContext from '../../../contexts/alert';


describe('Pruebas en <IFrameField/>', () => {

    const onDelete = jest.fn();
    const onChange = jest.fn();
    const showMessage = jest.fn();
    const value = {
        ref: 'https://app.powerbi.com/view?r=eyJrIjoiNmQ3ODYwOTUtZTBiMC00NWQxLWJjYTYtMGQ5ZjI4MDkwOGJlIiwidCI6IjMzZmE2OTA3LTIxYzYtNDEyNi1hYTY2LWJjYmVkOTUzNjFiYiIsImMiOjR9'
    }

    test('debe mostrarse correctamente', () => {
        const wrapper = mount(
            <DndProvider backend={HTML5Backend}>
                <AlertContext.Provider value={{
                    showMessage
                }}>
                    <IFrameField
                        id="iframent-id"
                        value={value}
                        onDelete={onDelete}
                        onChange={onChange}
                    />
                </AlertContext.Provider>
            </DndProvider>
        )
        expect(wrapper).toMatchSnapshot()
    })

    // test('debe de llamar la función onChange()', () => {
    //     act(() => {
    //         wrapper.find('input').prop('onChange')({ target: { value: value } })
    //     })
    //     wrapper.find('form').prop('onSubmit')({ preventDefault() { } });

    //     expect(onChange).toHaveBeenCalled();
    //     expect(onChange).toHaveBeenCalledTimes(1);
    //     expect(onChange).toHaveBeenCalledWith(value);
    // })

    test('debe llamar la función, onDelete()', () => {
        // const wrapper = mount(
        //     <DndProvider backend={HTML5Backend}>
        //         <AlertContext.Provider value={{
        //             showMessage
        //         }}>
        //             <IFrameField
        //                 id="iframent-id"
        //                 value={value}
        //                 onDelete={onDelete}
        //                 onChange={onChange}
        //             />
        //         </AlertContext.Provider>
        //     </DndProvider>
        // )
        // act(() => {
        //     wrapper.find('div').at(0).prop('onContextMenu')({ preventDefault() { }, currentTarget() { } });
        // })
        // expect(wrapper).toMatchSnapshot();
        // console.log(wrapper.html());

    })


})