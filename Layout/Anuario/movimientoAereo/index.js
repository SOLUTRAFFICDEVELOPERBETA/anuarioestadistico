import React from 'react';
import usePages from '../../../hooks/usePages';
import Spinner from '../../../components/Spinner';
import AnuarioEstadistico from '..';
import { Box } from '@material-ui/core';
import SectionGeneric from '../../../components/section';



const MovimientoAereo = () => {
    const dataAereo = usePages('MovimientoAereo')

    if (!dataAereo) return <Spinner />
    return (
        <AnuarioEstadistico>
            {dataAereo[0].fields.map(field => {
                return (
                    <Box>
                        <SectionGeneric {...field} key={field.id} />
                    </Box>
                )
            })}
        </AnuarioEstadistico>
    );
}

export default MovimientoAereo;