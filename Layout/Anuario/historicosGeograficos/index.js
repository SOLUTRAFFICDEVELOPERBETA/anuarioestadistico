import React from 'react';
import { Box } from '@material-ui/core';
import usePages from '../../../hooks/usePages';
import Spinner from '../../../components/Spinner';
import SectionGeneric from '../../../components/section';
import AnuarioEstadistico from '..';

/**
 * @description layout que permite visualizar la información del módulo de Historicos y Demográficos.
 * @see AnuarioEstadistico
 */
const HistoricosGeograficos = () => {
    const dataHistoricoGeograficos = usePages('HistoricosGeograficos');
    if (!dataHistoricoGeograficos) return <Spinner />;
    return (
        <AnuarioEstadistico>
            {dataHistoricoGeograficos[0].fields.map((field, index) => {
                return (
                    <Box key={index}>
                        <SectionGeneric {...field} key={field.id} />
                    </Box>
                );
            })}
        </AnuarioEstadistico>
    );
};

export default HistoricosGeograficos;
