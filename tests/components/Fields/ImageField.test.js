import '@testing-library/jest-dom';
import { act } from '@testing-library/react';
import { mount } from 'enzyme';
import React from 'react';
import { RouterContext } from 'next/dist/next-server/lib/router-context'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
// import ImageField from '../../../components/Fields/ImageField';
import AlertContext from '../../../contexts/alert';


describe('Pruebas en <ImageField/>', () => {
    const router = {
        query: {
            id: 'id-Params'
        }
    }
    const onDelete = jest.fn();
    const onChange = jest.fn();
    const showMessage = jest.fn();
    const value = {
        name: 'prueba',
        url: 'https://increasify.com.au/wp-content/uploads/2016/08/default-image.png',
        path: ''
    }

    test('debe mostrarse correctamente', () => {
        // const wrapper = mount(
        //     <DndProvider backend={HTML5Backend}>
        //         <AlertContext.Provider value={{
        //             showMessage
        //         }}>
        //             <RouterContext.Provider value={router}>
        //                 <ImageField
        //                     id="id-ImageField"
        //                     value={value}
        //                     size={12}
        //                     child={false}
        //                     disableGrid={false}
        //                     onChange={onChange}
        //                     onDelete={onDelete}
        //                 />
        //             </RouterContext.Provider>
        //         </AlertContext.Provider>
        //     </DndProvider>
        // )
        // expect(wrapper).toMatchSnapshot()
    })


})