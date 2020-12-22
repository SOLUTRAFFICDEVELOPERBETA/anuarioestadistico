import '@testing-library/jest-dom';
import { renderHook, act } from '@testing-library/react-hooks';
import { mount } from 'enzyme';
import useFixedList from '../../hooks/useFixedList';
import { itemList } from '../fixtures';

describe('Pruebas en useFixedList', () => {

    test('debe retornar un componente de tipo container, sin la lista ', async () => {
        const { result, waitForNextUpdate } = renderHook(() => useFixedList(10));
        const itemRender = jest.fn();

        const [setTotal, Container] = result.current;
        await waitForNextUpdate()
        expect(typeof setTotal).toBe('function');
        const wrapper = mount(<Container itemRender={itemRender} />);
        expect(wrapper.find('div').at(1).hasClass('spinner')).toBe(true)

    });

    test('debe cargar la lista de elementos envíada', async () => {
        const { result, waitForNextUpdate } = renderHook(() => useFixedList(10));

        const itemRender = jest.fn();
        const [setTotal] = result.current;
        await waitForNextUpdate()
        act(() => {
            setTotal(itemList);
        });
        const [, Container, total] = result.current;

        const wrapper = mount(<Container itemRender={itemRender} />);
        expect(wrapper).toMatchSnapshot();
        expect(total.length).toBe(10);
        expect(wrapper.hasClass('spinner')).toBe(false);
        expect(wrapper.find('span').at(0).text().trim()).toBe('Pagina 1 de 1')
        expect(wrapper.find('button').exists()).toBe(true)
    })


})