import '@testing-library/jest-dom';
import { renderHook, act } from '@testing-library/react-hooks';
import { shallow } from 'enzyme';
import PagesContext from '../../contexts/pagess';
import usePages from '../../hooks/usePages';
import { pagesTest } from '../fixtures';

describe('pruebas en usePages', () => {


    afterAll(() => {
        <PagesContext.Provider value={pagesTest}>
            <usePages />
        </PagesContext.Provider>
    })
    test('debe regresar la información de la página filtrada', async () => {

            // const { result } = renderHook(() => usePages('Página Uno'));
         
            // console.log(result.current);
        })
    })