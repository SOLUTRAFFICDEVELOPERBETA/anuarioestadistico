import React from 'react'
import '@testing-library/jest-dom';
import { shallow } from 'enzyme';
import moment from 'moment';
import DocumentsTable from '../../containers/DocumentsTable';
import { documents } from '../fixtures';


describe('Pruebas en <DocumentsTable/>', () => {
    const onDelete = jest.fn();
    const wrapper = shallow(
        <DocumentsTable
            documents={documents}
            onDelete={onDelete}
        />
    )
    test('debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    })
    test('dede mostrar la información enviada correctamente', () => {
        const title = wrapper.find('WithStyles(ForwardRef(TableCell))').at(0);
        const date = wrapper.find('WithStyles(ForwardRef(TableCell))').at(1);
        expect(title.text().trim()).toBe(documents[0].title);
        expect(date.text().trim()).toBe(moment(documents[0].lastModified).format('ll'));
    })

    test('debe llamar la función onDelete() ', () => {
        wrapper.find('WithStyles(ForwardRef(IconButton))').at(0).prop('onClick')();
        expect(onDelete).toHaveBeenCalled();
        expect(onDelete).toHaveBeenCalledTimes(1);
    })
})