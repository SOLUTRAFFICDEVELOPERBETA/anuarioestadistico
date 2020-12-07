import '@testing-library/jest-dom';
import { shallow } from 'enzyme';
import React from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
// import ChartField from '../../../components/Fields/ChartField';
import { demoDataGraphic } from '../../fixtures';

describe('Pruebas en <ChartField/>', () => {
    const onChange = jest.fn();
    const onDelete = jest.fn();
    // const wrapper = shallow(
    //     <DndProvider backend={HTML5Backend}>
    //         <ChartField
    //             id={'grahic-id'}
    //             value={demoDataGraphic}
    //             size={6}
    //             onChange={onChange}
    //             onDelete={onDelete}
    //         />
    //     </DndProvider>
    // )
    test('debe mostrarse correctamente', () => {
        // expect(wrapper).toMatchSnapshot()
    })

})