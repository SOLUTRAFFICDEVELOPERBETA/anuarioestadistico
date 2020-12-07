import React from 'react';
import usePages from '../../../hooks/usePages';
import Spinner from '../../../components/Spinner';
import AnuarioEstadistico from '..';
import { Box } from '@material-ui/core';
import SectionGeneric from '../../../components/section';

/**
 * @description layout que permite visualizar la información del módulo de Sector Empresarial.
 * @see AnuarioEstadistico
 */
const SectorEmpresarial = () => {
    const dataEmpresarial = usePages('SectorEmpresarial');

    if (!dataEmpresarial) return <Spinner />;
    return (
        <AnuarioEstadistico>
            {dataEmpresarial[0].fields.map((field, index) => {
                return (
                    <Box key={index}>
                        <SectionGeneric {...field} key={field.id} />
                    </Box>
                );
            })}
        </AnuarioEstadistico>
    );
};

export default SectorEmpresarial;
