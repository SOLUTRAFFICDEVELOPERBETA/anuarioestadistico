import React from 'react';
import '@testing-library/jest-dom';
import { shallow } from 'enzyme';
import DocumentsForm from '../../forms/DocumentsForm';
import { act } from '@testing-library/react';


describe('Pruebas en <DocumentsForm/>', () => {
    const onSubmit = jest.fn();


    let wrapper;
    beforeEach(() => {
        wrapper = shallow(
            <DocumentsForm
                onSubmit={onSubmit}
            />
        )
        jest.clearAllMocks()
    })
    test('debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    })

    test('debe llamar la función onSubmit()', () => {
        act(() => {
            wrapper.find('WithStyles(ForwardRef(IconButton))').prop('onClick')({
                currentTarget: {

                    innerText: 'innerText prueba de texto',
                    localName: "span"

                }
            });
        })
        wrapper.find('WithStyles(ForwardRef(ListItem))').prop('onClick')({
            currentTarget: {
                innerText: 'innerText prueba de texto TEMPRORAL',
                localName: "span"
            }
        })
        wrapper.find('WithStyles(ForwardRef(ListItem))').at(1).prop('onClick')();
        expect(onSubmit).toHaveBeenCalled();
        expect(onSubmit).toHaveBeenCalledTimes(1);
    })
})