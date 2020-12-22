import React from 'react';
import '@testing-library/jest-dom';
import { mount, } from 'enzyme';
// import Home from '../../pages';
import PagesContext from '../../contexts/pagess';
import { pagesTest, demoDataFooter, user } from '../fixtures';
import ThemeContext from '../../contexts/theme';
import AuthContext from '../../contexts/auth';


describe('Pruebas en <Home/>', () => {
    // const onLogOut = jest.fn();
    // const wrapper = mount(
    //     <PagesContext.Provider value={{
    //         pages: pagesTest
    //     }}>
    //         <ThemeContext.Provider value={{
    //             infoFooter: demoDataFooter
    //         }}>
    //             <AuthContext.Provider value={{
    //                 user,
    //                 auth: 'iJS33nCqhKgjYTo38t5hV38gnW73',
    //                 onLogOut
    //             }}>
    //                 <Home />
    //             </AuthContext.Provider>
    //         </ThemeContext.Provider>
    //     </PagesContext.Provider>
    // )

    test('debe mostrarse correctamente pruebas por realizar, Prueba pendiente', () => {
        // expect(wrapper).toMatchSnapshot();
    })

    // test('No de bebe llamar la función registerUser()', () => {
    //     wrapper.find('form').prop('onSubmit')({ preventDefault() { } });

    //     expect(registerUser).not.toHaveBeenCalled();
    //     expect(registerUser).toHaveBeenCalledTimes(0);
    // })

})