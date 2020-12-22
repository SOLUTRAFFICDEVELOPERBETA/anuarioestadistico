import '@testing-library/jest-dom';
import { renderHook, act } from '@testing-library/react-hooks';
import { shallow } from 'enzyme';
import useDialog from '../../hooks/useDialog';
import { itemList } from '../fixtures';

describe('Pruebas useDialog', () => {

    test('debe retornar un dialogContainer y llamar la función handleToggle() ', async () => {
        const { result } = renderHook(() => useDialog());
        const [handleToggle] = result.current

        act(() => {
            handleToggle()
        })

        expect(typeof handleToggle).toBe('function');

        const [, DialogContainer] = result.current
        const children = <p>Componente Hijo</p>
        const actions = <button>Acciones resumida</button>
        const wrapper = shallow(
            <DialogContainer
                title="Dialog de prueba"
                children={children}
                actions={actions}
            />
        )
        expect(wrapper.find('WithStyles(ForwardRef(Dialog))').exists()).toBe(true);
    })
})