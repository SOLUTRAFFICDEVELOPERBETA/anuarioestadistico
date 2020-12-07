import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import React from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend';
// import DocumentField from '../../../components/Fields/DocumentField';

describe('Pruebas en <DocumentField/>', () => {
    const onDrop = jest.fn();
    // const wrapper = mount(
    //     <DndProvider backend={HTML5Backend}>
    //         <DocumentField
    //             id=""
    //             value=""
    //             type={null}
    //             size={12}
    //             onDrop={onDrop}
    //         />
    //     </DndProvider>
    // )
    
    test('debe mostrarse correctamente', () => {
        // expect(wrapper).toMatchSnapshot();
    })

})