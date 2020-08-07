import React from 'react';
import PageInicio from '../../containers/pageInicio';
import usePages from '../../hooks/usePages';
import PropTypes from 'prop-types';
import Spinner from '../../components/Spinner';

const AnuarioEstadistico = ({ children }) => {
    const dataInicio = usePages('Inicio');

    if (!dataInicio) return <Spinner />
    return (
        <div>
            <PageInicio fields={dataInicio[0].fields} />
            <div>
                {children}
            </div>
        </div>
    );
}

AnuarioEstadistico.propTypes = {
    children: PropTypes.any
}
export default AnuarioEstadistico;