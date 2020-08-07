import React from 'react';
import usePages from '../../../hooks/usePages';
import Spinner from '../../../components/Spinner';
import AnuarioEstadistico from '..';
import { Box } from '@material-ui/core';
import SectionGeneric from '../../../components/section';



const HaciendaPublica = () => {
    const dataSalud = usePages('HaciendaPublica')

    if (!dataSalud) return <Spinner />
    return (
        <AnuarioEstadistico>
            {dataSalud[0].fields.map(field => {
                return (
                    <Box>
                        <SectionGeneric {...field} key={field.id} />
                    </Box>
                )
            })}
        </AnuarioEstadistico>
    );
}

export default HaciendaPublica;