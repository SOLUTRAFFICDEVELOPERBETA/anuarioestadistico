import React from 'react';
import usePages from '../../../hooks/usePages';
import Spinner from '../../../components/Spinner';
import AnuarioEstadistico from '..';
import SectionGeneric from '../../../components/section';
import { Box } from '@material-ui/core';

/**
 * layout que permite visualizar la información del módulo de Seguridad y Convivencia.
 */
const SeguridadConvivencia = () => {
    const dataSeguridad = usePages('SeguridadConvivencia');

    if (!dataSeguridad) return <Spinner />;

    return (
        <AnuarioEstadistico>
            {dataSeguridad[0].fields.map((field, index) => {
                return (
                    <Box key={index}>
                        <SectionGeneric {...field} key={field.id} />
                    </Box>
                );
            })}
        </AnuarioEstadistico>
    );
};

export default SeguridadConvivencia;
