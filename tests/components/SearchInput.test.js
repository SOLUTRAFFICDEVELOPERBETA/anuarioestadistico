import '@testing-library/jest-dom';
import { shallow } from 'enzyme';
import React from 'react';
import SearchInput from '../../components/SearchInput';

describe('Pruebas en el componente <SearchInput/>', () => {
    const onSearch = jest.fn()
    const wrapper = shallow(
        <SearchInput
            onSearch={onSearch}
            label={'label de prueba'}
        />
    )

    test('debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('debe llamar la función, onSearch()', () => {
        wrapper.find('WithStyles(ForwardRef(TextField))').prop('inputRef')()
        wrapper.find('form').simulate('submit');

        expect(onSearch).toHaveBeenCalled();
        expect(onSearch).toHaveBeenCalledTimes(1)
    })

})