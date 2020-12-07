import '@testing-library/jest-dom';
import { shallow } from 'enzyme';
import React from 'react';
import PageTitle from '../../components/PageTitle';

describe('Pruebas en <PageTitle/>', () => {
    const actions = <button>Acciones de prueba</button>
    const wrapper = shallow(
        <PageTitle
            title="Titulo de prueba"
            subtitle="subtitulo de prueba"
            children={<p>esto es un children</p>}
            actions={actions}
            disableDivider={false}
        />
    )
    test('debe mostrarse correctamente', () => {

        expect(wrapper).toMatchSnapshot()
    })

    test('debe mostrar la información correctamente', () => {
        expect(wrapper.find('WithStyles(ForwardRef(Typography))').at(0).text().trim()).toBe('Titulo de prueba')
        expect(wrapper.find('WithStyles(ForwardRef(Typography))').at(1).text().trim()).toBe('subtitulo de prueba')
        expect(wrapper.find('WithStyles(ForwardRef(Typography))').at(2).text().trim()).toBe('esto es un children')

        expect(wrapper.find('button').html()).toBe('<button>Acciones de prueba</button>');

        expect(wrapper.find('WithStyles(ForwardRef(Divider))').exists()).toBe(true);
    })

    test('debe ocultar el divider cuando disableDivider = true', () => {
        const wrapper = shallow(
            <PageTitle
                title="Titulo de prueba"
                subtitle="subtitulo de prueba"
                children={<p>esto es un children</p>}
                actions={actions}
                disableDivider={true}
            />
        )

        expect(wrapper.find('WithStyles(ForwardRef(Divider))').exists()).toBe(false);
    })
})