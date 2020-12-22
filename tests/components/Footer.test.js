import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import React from 'react';
import MainFooter from '../../components/Footer';
import ThemeContext from '../../contexts/theme';

describe('Pruebas en <MainFooter/>', () => {
    const demoData = {
        direction: 'calle23',
        logo: 'https://www.nashikproperty.com/uploads/builder-logo/default-logo.png',
        aboutus: 'Acerca de nosotros mas mas',
        urlFacebook: 'https://www.facebook.com/',
        urlInstagram: 'https://www.instagram.com/?hl=es-la',
        urlTwitter: 'https://twitter.com/?lang=es'
    }
    const wrapper = mount(
        <ThemeContext.Provider value={{
            infoFooter: demoData
        }}>
            <MainFooter />
        </ThemeContext.Provider>
    )

    test('Debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    })

    test('Debe mostrar la información correctamente', () => {

        expect(wrapper.find('a').at(0).prop('href').trim()).toBe('/calle23');
        expect(wrapper.find('a').at(1).prop('href').trim()).toBe(demoData.urlFacebook);
        expect(wrapper.find('a').at(2).prop('href').trim()).toBe(demoData.urlInstagram);
        expect(wrapper.find('a').at(3).prop('href').trim()).toBe(demoData.urlTwitter);
        expect(wrapper.find('.acerca-nosotros').at(1).text().trim()).toBe(`Acerca de nosotros${demoData.aboutus}`)
        expect(wrapper.find('img').prop('src').trim()).toBe(demoData.logo);
        

    })
})
