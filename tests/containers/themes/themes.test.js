import React from 'react'
import '@testing-library/jest-dom';
import { shallow } from 'enzyme';
import { THEMES } from '../../../constants/options';
import ThemeSelector from '../../../containers/themes';



describe('Pruebas en <ThemeSelector/>', () => {
    const onSelect = jest.fn();
    const wrapper = shallow(
        <ThemeSelector
            themes={THEMES}
            onSelect={onSelect}
        />
    )

    test('debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    })

    test('debe llamar la función onSelect()', () => {

        wrapper.find('WithStyles(ForwardRef(ListItem))').at(0).prop('onClick')();

        expect(onSelect).toHaveBeenCalled();
        expect(onSelect).toHaveBeenCalledTimes(1);
    })
})