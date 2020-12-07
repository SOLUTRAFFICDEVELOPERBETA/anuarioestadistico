import React from 'react';
import PropTypes from 'prop-types';
import fb from '../../config/firebase';
import PagesContext from '.';
import PagesReducer from './reducer';
import { GET_PAGES, GET_PAGES_ERROR } from '../../constants/types';
import AlertContext from '../alert';

const NAME_COLLECTION = 'pages';

/**
 * @description Context que permite cargar todo la información de las páginas creadas.
 * @param {any} children Propiedades del componente.
 */
const PagesProvider = ({ children }) => {
    const initialState = {
        pages: null,
        error: null
    };
    const { showMessage } = React.useContext(AlertContext);
    const [state, dispatch] = React.useReducer(PagesReducer, initialState);

    /**
     * @description Método que permite obtener todas las paginas creadas,
     * en el momento que la pagina se este cargando.
     */
    React.useEffect(() => {
        const getPages = () => {
            try {
                fb.db.collection(NAME_COLLECTION).onSnapshot((snap) => {
                    const array = [];
                    snap.forEach((doc) => {
                        array.push({ ...doc.data(), id: doc.id });
                    });
                    dispatch({
                        type: GET_PAGES,
                        payload: array
                    });
                });
            } catch (error) {
                console.log(error);
                showMessage(error.message, 'error');
                dispatch({
                    type: GET_PAGES_ERROR
                });
            }
        };
        getPages();
    }, []);

    return (
        <PagesContext.Provider
            value={{
                pages: state.pages
            }}>
            {children}
        </PagesContext.Provider>
    );
};
PagesProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default PagesProvider;
