import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import React from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import DividerLine from '../../../components/Fields/DividerLine';


describe('Pruebas en <DividerLine/>', () => {

    const onDelete = jest.fn();
    const wrapper = mount(
        <DndProvider backend={HTML5Backend}>
            <DividerLine
                id="divider-id"
                child={true}
                onDelete={onDelete}
            />
        </DndProvider>
    )
    test('debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot()
    })

    test('debe llamar la función, onDelete()', () => {
        wrapper.find('div').prop('onClick')();

        expect(onDelete).toHaveBeenCalled();
        expect(onDelete).toHaveBeenCalledTimes(1)
    })

})