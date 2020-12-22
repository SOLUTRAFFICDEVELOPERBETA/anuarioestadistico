import React from 'react'
import '@testing-library/jest-dom';
import { shallow } from 'enzyme';
import ColorPicker from '../../../containers/picker';

describe('Prueba en <ColorPicker/>', () => {
    const onChange = jest.fn();
    const wrapper = shallow(
        <ColorPicker
            color="#00000"
            palette="primary"
            onChange={onChange}

        />
    )
    test('debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    })

    test('debe llamar la función onChange()', () => {
        wrapper.find('WithStyles(ForwardRef(IconButton))').at(1).prop('onClick')();

        expect(onChange).toHaveBeenCalled();
        expect(onChange).toHaveBeenCalledTimes(1);
    })
})