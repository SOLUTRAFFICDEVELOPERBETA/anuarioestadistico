import React from 'react';
import '@testing-library/jest-dom';
import { mount, } from 'enzyme';
// import Page from '../../../pages/paginas';
import AlertContext from '../../../contexts/alert';


describe('Pruebas en <Paginas/>', () => {

    // const showMessage = jest.fn();

    // const wrapper = mount(
    //     <AlertContext.Provider value={{
    //         showMessage
    //     }}>
    //         <Page />
    //     </AlertContext.Provider>
    // )

    test('debe mostrarse correctamente pruebas por realizar', () => {
        // expect(wrapper).toMatchSnapshot();
    })

    // test('No de bebe llamar la función registerUser()', () => {
    //     wrapper.find('form').prop('onSubmit')({ preventDefault() { } });

    //     expect(registerUser).not.toHaveBeenCalled();
    //     expect(registerUser).toHaveBeenCalledTimes(0);
    // })

})