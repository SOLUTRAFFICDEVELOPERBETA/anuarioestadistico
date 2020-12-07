import '@testing-library/jest-dom';
import { shallow } from 'enzyme';
import React from 'react';
import Spinner from '../../components/Spinner';

describe('Pruebas en el componente <Spinner/>', () => {

    const wrapper = shallow(
        <Spinner
            dialog={false}
        />
    )

    test('debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    });

})