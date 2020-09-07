import React from 'react';
import usePages from '../../../hooks/usePages';
import Spinner from '../../../components/Spinner';
import AnuarioEstadistico from '..';
import { Box } from '@material-ui/core';
import SectionGeneric from '../../../components/section';

/**
 * layout que permite visualizar la información del módulo de Movilidad Terrestre.
 */
const TerrestrialMobility = () => {
    const dataMovilidad = usePages('Movilidad');

    if (!dataMovilidad) return <Spinner />;
    return (
        <AnuarioEstadistico>
            <Box>
                {dataMovilidad[0].fields.map((field, index) => {
                    return (
                        <Box key={index}>
                            <SectionGeneric {...field} key={field.id} />
                        </Box>
                    );
                })}
            </Box>
        </AnuarioEstadistico>
    );
};

export default TerrestrialMobility;
