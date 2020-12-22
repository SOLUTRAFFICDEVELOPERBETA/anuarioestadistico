import '@testing-library/jest-dom';
import { shallow } from 'enzyme';
import React from 'react';
import PaginationBar from '../../components/PaginationBar';

describe('Pruebas en <PaginationBar/>', () => {
    const onBack = jest.fn();
    const onSkipBack = jest.fn();
    const onNext = jest.fn();
    const onSkipNext = jest.fn();
    const wrapper = shallow(
        <PaginationBar
            onNext={onNext}
            onSkipNext={onSkipNext}
            showNext={true}
            onBack={onBack}
            onSkipBack={onSkipBack}
            showBack={true}
            label={`Pagina 1 de 4`}
        />
    )

    test('debe Mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    })

    test('debe retornar el testo correctamente', () => {

        expect(wrapper.find('WithStyles(ForwardRef(Typography))').text().trim()).toBe('Pagina 1 de 4')
    })

    test('debe llamar la funciones de onBack(), onSkipBack(), onNext() y onSkipNext()', () => {
        wrapper.find('WithStyles(ForwardRef(IconButton))').at(0).simulate('click');
        wrapper.find('WithStyles(ForwardRef(IconButton))').at(1).simulate('click');
        wrapper.find('WithStyles(ForwardRef(IconButton))').at(2).simulate('click');
        wrapper.find('WithStyles(ForwardRef(IconButton))').at(3).simulate('click');

        expect(onSkipBack).toHaveBeenCalled();
        expect(onBack).toHaveBeenCalled();
        expect(onNext).toHaveBeenCalled();
        expect(onSkipNext).toHaveBeenCalled();

        expect(onSkipBack).toHaveBeenCalledTimes(1);
        expect(onBack).toHaveBeenCalledTimes(1);
        expect(onNext).toHaveBeenCalledTimes(1);
        expect(onSkipNext).toHaveBeenCalledTimes(1);

    })
})
