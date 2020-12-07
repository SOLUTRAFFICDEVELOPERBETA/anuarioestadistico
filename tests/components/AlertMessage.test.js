import { mount } from "enzyme"
import '@testing-library/jest-dom'
import AlertMessage from "../../components/AlertMessage"
import AlertContext from "../../contexts/alert"

describe('Pruebas en <AlertMessage/>', () => {
    const closeMessage = jest.fn();
    const message = {
        text: 'Texto de prueba',
        category: 'succes',
        time: 3000
    }
    const wrapper = mount(
        <AlertContext.Provider value={{
            closeMessage,
            message

        }}>

            <AlertMessage
            />

        </AlertContext.Provider>
    )

    test('debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot()
    })

    test('debe de mostar el mensaje correctamente', () => {
        expect(wrapper.find('div').at(2).text().trim()).toBe(message.text);
    });

    test('debe llamar a la función closeMessage()', () => {
        wrapper.find('button').prop('onClick')()
        expect(closeMessage).toHaveBeenCalled();
        expect(closeMessage).toHaveBeenCalledTimes(1);
    })
})