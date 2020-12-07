import React from 'react';
import PagesContext from '../contexts/pagess';

/**
 * @description Hook que permite realizar un filtro a la paginas creadas.
 * pasándola como argumento la pagina a buscar.
 * @param {string} source path de la pagina a buscar.
 */
const usePages = (source) => {
    const { pages } = React.useContext(PagesContext);
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        if (pages) {
            setData(pages.filter((page) => page.title === source));
        }
    }, [pages]);

    const d =
        data &&
        data.map((page) => ({
            fields: page.fields,
            title: page.title,
            id: page.id
        }));

    return d;
};

export default usePages;
