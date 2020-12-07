import { ColorLensTwoTone } from '@material-ui/icons';
import '@testing-library/jest-dom';
import { act } from '@testing-library/react';
import { mount } from 'enzyme';
import React from 'react';
import ColorPick from '../../components/ColorPick';
import { COLORS } from '../../constants/colors';
import AlertContext from '../../contexts/alert';


describe(' Pruebas en <ColorPick/>', () => {
    const showMessage = jest.fn();
    const onChange = jest.fn();
    const wrapper = mount(
        <AlertContext.Provider value={{
            showMessage
        }}>
            <ColorPick
                color='#000000'
                colors={COLORS}
                onChange={onChange}
                icon={() => <ColorLensTwoTone />}

            />
        </AlertContext.Provider>
    )

    test('Debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('ebe mostrar las opciones del popover y llamar la función onChange() ', () => {
        const wrapper = mount(
            <AlertContext.Provider value={{
                showMessage
            }}>
                <ColorPick
                    color='#000000'
                    colors={COLORS}
                    onChange={onChange}
                    icon={() => <ColorLensTwoTone />}

                />
            </AlertContext.Provider>
        )
        wrapper.find('button').simulate('click', { currentTarget: () => { } });
        expect(wrapper.find('form').exists()).toBe(true);
        wrapper.find('form').at(0).prop('onSubmit')({ preventDefault() { } });
        wrapper.find('form').at(1).prop('onSubmit')({ preventDefault() { } });
        expect(onChange).toHaveBeenCalled();
        expect(onChange).toHaveBeenCalledTimes(1)

    })

})