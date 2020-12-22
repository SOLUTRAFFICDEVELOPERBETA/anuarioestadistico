import '@testing-library/jest-dom';
import { renderHook, act } from '@testing-library/react-hooks';
import { shallow } from 'enzyme';
import usePopover from '../../hooks/usePopover';


describe('Pruebas en usePopover', () => {

    test('debe regresar la función que lo despliega y el componente container', () => {

        const { result } = renderHook(() => usePopover());
        const [handleClick,] = result.current
        act(() => {
            handleClick({
                currentTarget: {
                    innerText: 'innerText prueba de texto',
                    localName: "span"
                }
            })
        })
        expect(typeof handleClick).toBe('function');

        const [, PopoverComponent] = result.current
        const children = (<p>Esto es un hijo</p>)
        const wrapper = shallow(
            <PopoverComponent
                id={`popover${21}`}
                children={children}
            />
        )
        expect(wrapper.find('WithStyles(ForwardRef(Popover))').exists()).toBe(true);
        expect(wrapper.find('WithStyles(ForwardRef(Popover))').text().trim()).toBe('Esto es un hijo')
    })
})