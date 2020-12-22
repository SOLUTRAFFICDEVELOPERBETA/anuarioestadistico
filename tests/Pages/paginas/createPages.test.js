import React from 'react';
import '@testing-library/jest-dom';
import { mount, } from 'enzyme';
import { RouterContext } from 'next/dist/next-server/lib/router-context'
// import Page from '../../../pages/paginas/createPages/[id]';
import AlertContext from '../../../contexts/alert';


describe('Pruebas en <Page/>', () => {

    // const showMessage = jest.fn();
    // const router = {
    //     pathname: '/',
    //     route: '',
    //     basePatch: '',
    //     query: { id: '0Kcjcgvjfxr1Dzf6sEjR' },
    //     asPath: '',
    //     push: jest.fn(),
    //     replace: jest.fn(),
    //     reload: jest.fn(),
    //     back: jest.fn(),
    //     prefetch: jest.fn(),
    //     beforePopState: jest.fn(),
    //     listen: jest.fn(),
    //     isFallback: false,
    //     events: {
    //         on: jest.fn(),
    //         off: jest.fn(),
    //         emit: jest.fn(),
    //     },
    // }
    // const wrapper = mount(
    //     <RouterContext.Provider value={router}>
    //         <AlertContext.Provider value={{
    //             showMessage
    //         }}>
    //             <Page />
    //         </AlertContext.Provider>
    //     </RouterContext.Provider>

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