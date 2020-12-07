import React from 'react';
import usePages from '../../../hooks/usePages';
import Spinner from '../../../components/Spinner';
import AnuarioEstadistico from '..';
import { Box } from '@material-ui/core';
import SectionGeneric from '../../../components/section';

/**
 * @description layout que permite visualizar la información del módulo de Educación.
 * @see AnuarioEstadistico
 */
const Educacion = () => {
    const dataEducacion = usePages('Educacion');

    if (!dataEducacion) return <Spinner />;
    return (
        <AnuarioEstadistico>
            {dataEducacion[0].fields.map((field, index) => {
                return (
                    <Box key={index}>
                        <SectionGeneric {...field} key={field.id} />
                    </Box>
                );
            })}
        </AnuarioEstadistico>
    );
};

export default Educacion;
