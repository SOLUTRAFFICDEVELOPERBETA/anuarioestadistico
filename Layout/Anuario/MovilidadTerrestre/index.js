import React from 'react';
import usePages from '../../../hooks/usePages';
import Spinner from '../../../components/Spinner';
import AnuarioEstadistico from '..';
import { Box } from '@material-ui/core';
import SectionGeneric from '../../../components/section';
const TerrestrialMobility = () => {
    const dataMovilidad = usePages('Movilidad')

    if (!dataMovilidad) return <Spinner />
    return (
        <AnuarioEstadistico>
            <Box>
                {dataMovilidad[0].fields.map(field => {
                    return (
                        <Box>
                            <SectionGeneric {...field} key={field.id} />
                        </Box>
                    )
                })}

            </Box>
        </AnuarioEstadistico>
    );
}

export default TerrestrialMobility;