import '@testing-library/jest-dom';
import { act } from '@testing-library/react';
import { shallow } from 'enzyme';
import React from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { demoDataSection } from '../../fixtures';
// import SectionField from '../../../components/Fields/SectionField';


describe('Pruebas en <SectionField/>', () => {

    const onDelete = jest.fn();
    const onChange = jest.fn((data) => console.log(data));

    test('debe mostrarse correctamente', () => {
        // const wrapper = shallow(
        //     <DndProvider backend={HTML5Backend}>
        //         <SectionField
        //             id="id-ImageField"
        //             value={demoDataSection}
        //             size={12}
        //             onChange={onChange}
        //             onDelete={onDelete}
        //         />
        //     </DndProvider>
        // )
        // expect(wrapper).toMatchSnapshot()
    });


    // test('debe llamar la función onChange() ', () => {
    //     const wrapper = mount(
    //         <DndProvider backend={HTML5Backend}>
    //             <AlertContext.Provider value={{
    //                 showMessage
    //             }}>
    //                 <ListField
    //                     id="id-ImageField"
    //                     value={valueTypeArray}
    //                     size={12}
    //                     onChange={onChange}
    //                     onDelete={onDelete}
    //                 />
    //             </AlertContext.Provider>
    //         </DndProvider>
    //     )
    //     wrapper.find('div').at(4).prop('onBlur')({ target: { id: 1, textContent: 'lista 2 de prueba' } });

    //     expect(onChange).toHaveBeenCalled();
    //     expect(onChange).toHaveBeenCalledTimes(1);
    //     expect(onChange).toHaveBeenCalledWith(expect.any(Object));
    //     expect(onChange).toHaveBeenCalledWith({
    //         value: ['lista 1']
    //     });
    // })

    // test('debe de llamar la función onDelete()', () => {
    //     const wrapper = mount(
    //         <DndProvider backend={HTML5Backend}>
    //             <AlertContext.Provider value={{
    //                 showMessage
    //             }}>
    //                 <ListField
    //                     id="id-ImageField"
    //                     value={valueTypeArray}
    //                     size={12}
    //                     onChange={onChange}
    //                     onDelete={onDelete}
    //                 />
    //             </AlertContext.Provider>
    //         </DndProvider>
    //     )
    //     act(() => {
    //         wrapper.find('div').at(0).prop('onContextMenu')({ preventDefault() { }, currentTarget(){}});
    //     })
    //     // expect(wrapper).toMatchSnapshot();
    //     // expect(wrapper.find(''))
    //     // console.log(wrapper.html());
    // })

})