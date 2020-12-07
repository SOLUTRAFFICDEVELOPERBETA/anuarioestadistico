import React from 'react';
import usePages from '../../../hooks/usePages';
import Spinner from '../../../components/Spinner';
import AnuarioEstadistico from '..';
import SectionGeneric from '../../../components/section';
import { Box } from '@material-ui/core';

/**
 * @description layout que permite visualizar la información del módulo de Recreación y Zonas Verdes.
 * @see AnuarioEstadistico
 */
const Reacreacion = () => {
    const dataRecreacion = usePages('Recreacion');

    if (!dataRecreacion) return <Spinner />;
    return (
        <AnuarioEstadistico>
            {dataRecreacion[0].fields.map((field, index) => {
                return (
                    <Box key={index}>
                        <SectionGeneric {...field} key={field.id} />
                    </Box>
                );
            })}
        </AnuarioEstadistico>
    );
};

export default Reacreacion;
