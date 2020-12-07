import React from 'react';
import usePages from '../../../hooks/usePages';
import Spinner from '../../../components/Spinner';
import AnuarioEstadistico from '..';
import { Box } from '@material-ui/core';
import SectionGeneric from '../../../components/section';

/**
 * @description layout que permite visualizar la información del módulo de Sector Agropecuario.
 * @see AnuarioEstadistico
 */
const SectorAgropecuario = () => {
    const dataAgropecuario = usePages('SectorAgropecuario');

    if (!dataAgropecuario) return <Spinner />;
    return (
        <AnuarioEstadistico>
            {dataAgropecuario[0].fields.map((field, index) => {
                return (
                    <Box key={index}>
                        <SectionGeneric {...field} key={field.id} />
                    </Box>
                );
            })}
        </AnuarioEstadistico>
    );
};

export default SectorAgropecuario;
