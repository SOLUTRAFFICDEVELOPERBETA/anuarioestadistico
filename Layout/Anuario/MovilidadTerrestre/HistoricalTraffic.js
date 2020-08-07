import React from 'react';
import usePages from '../../../hooks/usePages'
import Spinner from '../../../components/Spinner';
import SectionGeneric from '../../../components/section';
import { Box } from '@material-ui/core';
const HistoricalTraffic = () => {
    const dataHistory = usePages("Movilidad")

    if (!dataHistory) return <Spinner />
    return (
        <div>
            {dataHistory[0].fields[2].value.map(field => {
                return (
                    <Box>
                        <SectionGeneric {...field} key={field.id} />
                    </Box>
                )
            })}
        </div>
    );
}

export default HistoricalTraffic;