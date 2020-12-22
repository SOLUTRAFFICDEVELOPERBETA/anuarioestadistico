import React from 'react'
import '@testing-library/jest-dom';
import { shallow } from 'enzyme';
import ColorPalette from '../../../containers/themes/color';
import { THEMES } from '../../../constants/options';



describe('Pruebas en <ColorPalette/>', () => {
    const wrapper = shallow(
        <ColorPalette
            palette={THEMES[0].palette}
        />
    )

    test('debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    })
})