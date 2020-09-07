import React from 'react';
import usePages from '../../../hooks/usePages';
import Spinner from '../../../components/Spinner';
import AnuarioEstadistico from '..';
import { Box } from '@material-ui/core';
import SectionGeneric from '../../../components/section';

/**
 * layout que permite visualizar la información del módulo de Servicios Públicos.
 */
const ServiciosPublicos = () => {
    const dataServicios = usePages('serviciosPublicos');

    if (!dataServicios) return <Spinner />;
    return (
        <AnuarioEstadistico>
            {dataServicios[0].fields.map((field, index) => {
                return (
                    <Box key={index}>
                        <SectionGeneric {...field} key={field.id} />
                    </Box>
                );
            })}
        </AnuarioEstadistico>
    );
};

export default ServiciosPublicos;
