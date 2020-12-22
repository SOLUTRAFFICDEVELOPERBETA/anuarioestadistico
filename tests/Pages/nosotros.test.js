import React from 'react';
import '@testing-library/jest-dom';
import { mount, } from 'enzyme';
import PagesContext from '../../contexts/pagess';
import { demoDataFooter, pagesTest, user } from '../fixtures';
import Nosotros from '../../pages/nosotros';
import AuthContext from '../../contexts/auth';
import ThemeContext from '../../contexts/theme';


describe('Pruebas en <Nosotros/>', () => {
    const onLogOut = jest.fn();
    const wrapper = mount(
        <ThemeContext.Provider value={{
            infoFooter: demoDataFooter
        }}>
            <AuthContext.Provider value={{
                user,
                auth: 'iJS33nCqhKgjYTo38t5hV38gnW73',
                onLogOut
            }}>
                <PagesContext.Provider value={{
                    pages: pagesTest
                }}>
                    <Nosotros />
                </PagesContext.Provider>
            </AuthContext.Provider>
        </ThemeContext.Provider>
    )

    test('debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    })

    test('debe de mostrar la información enviada del módulo', () => {
        const h3 = wrapper.find('h3');
        const p = wrapper.find('p').at(0);
    
        expect(h3.text().trim()).toBe('titulo uno');
        expect(p.text().trim()).toBe('subtitule');
        
    })

})