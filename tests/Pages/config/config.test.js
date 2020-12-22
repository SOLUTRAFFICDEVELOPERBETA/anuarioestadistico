import React from 'react';
import '@testing-library/jest-dom';
import { mount,  } from 'enzyme';
import ThemeContext from '../../../contexts/theme';
// import ConfigPage from '../../../pages/config'
import { THEMES } from '../../../constants/options';
import { demoDataFooter } from '../../fixtures';


describe('Pruebas en <ConfigPage/>', () => {

    // const EditPalette = jest.fn();
    // const SaveChange = jest.fn();
    // const bg = {
    //     name: 'imagen prueba',
    //     path: '/img/prueba.png',
    //     url: 'https://www.valladolid.mx/assets/img/default.jpg'
    // }
    // const wrapper = mount(
    //     <ThemeContext.Provider value={{
    //         palette: THEMES[1].palette,
    //         bg,
    //         themes: THEMES,
    //         infoFooter: demoDataFooter,
    //         EditPalette,
    //         SaveChange
    //     }}>
    //         <ConfigPage />
    //     </ThemeContext.Provider>

    // )

    test('debe mostrarse correctamente', () => {
        // expect(wrapper).toMatchSnapshot();
    })

    // test('No de bebe llamar la función registerUser()', () => {
    //     wrapper.find('form').prop('onSubmit')({ preventDefault() { } });

    //     expect(registerUser).not.toHaveBeenCalled();
    //     expect(registerUser).toHaveBeenCalledTimes(0);
    // })

})