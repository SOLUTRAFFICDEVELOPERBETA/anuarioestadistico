import React from 'react';
import '@testing-library/jest-dom';
import { shallow } from 'enzyme';
import TableGeneric from '../../components/table';
import { demoDataTable } from '../fixtures';

describe('Pruebas en el componente <TableGeneric/>', () => {
   
    const wrapper = shallow(
        <TableGeneric
            data={demoDataTable}
        />

    )

    test('debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    });

    

})