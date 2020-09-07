import React from 'react';
import usePages from '../../../hooks/usePages';
import { Box } from '@material-ui/core';
import AnuarioEstadistico from '..';
import Spinner from '../../../components/Spinner';
import SectionGeneric from '../../../components/section';

/**
 * layout que permite visualizar la información del módulo de Demografía.
 */
const Demografia = () => {
    const dataDemografia = usePages('Demografia');

    if (!dataDemografia) return <Spinner />;
    return (
        <AnuarioEstadistico>
            {dataDemografia[0].fields.map((field, index) => {
                return (
                    <Box key={index}>
                        <SectionGeneric {...field} key={field.id} />
                    </Box>
                );
            })}
        </AnuarioEstadistico>
    );
};

export default Demografia;
