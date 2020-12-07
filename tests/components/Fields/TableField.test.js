import '@testing-library/jest-dom';
import { act } from '@testing-library/react';
import { mount } from 'enzyme';
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TableField from '../../../components/Fields/TableField';
import { demoDataTable } from '../../fixtures';

describe('Pruebas en <TableField/>', () => {
    const onChange = jest.fn(() => {});
    const onDelete = jest.fn();
    const wrapper = mount(
        <DndProvider backend={HTML5Backend}>
            <TableField
                id="id-TableField"
                value={demoDataTable}
                onChange={onChange}
                onDelete={onDelete}
            />
        </DndProvider>
    )
    test('debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    })

    test('debe llamar la función onChange()', () => {
        wrapper.find('td').at(0).prop('onBlur')({ target: { textContent: 'realizando test' }, persist() { } })

        // expect(onChange).toHaveBeenCalled();
        // expect(onChange).toHaveBeenCalledTimes(1);

    })


    test('debe llamar abrir en popover()', () => {

        act(() => {
            wrapper.find('button').at(1).prop('onClick')({ currentTarget() { } });
        })
        expect(wrapper).toMatchSnapshot()
        
    })
})