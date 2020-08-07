import React from 'react';
import usePages from '../../../hooks/usePages';
import Spinner from '../../../components/Spinner';
import AnuarioEstadistico from '..';
import { Box } from '@material-ui/core';
import SectionGeneric from '../../../components/section';



const SectorFinanciero = () => {
    const dataSector = usePages('SectorFinanciero')

    if (!dataSector) return <Spinner />
    return (
        <AnuarioEstadistico>
            {dataSector[0].fields.map(field => {
                return (
                    <Box>
                        <SectionGeneric {...field} key={field.id} />
                    </Box>
                )
            })}
        </AnuarioEstadistico>
    );
}

export default SectorFinanciero;