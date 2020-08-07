import React from 'react';
import usePages from '../../../hooks/usePages'
import { Box } from '@material-ui/core';
import AnuarioEstadistico from '..';
import Spinner from '../../../components/Spinner';
import SectionGeneric from '../../../components/section';

const Demografia = () => {
    const dataDemografia = usePages('Demografia')

    if (!dataDemografia) return <Spinner />
    return (
        <AnuarioEstadistico>
            {dataDemografia[0].fields.map(field => {
                return (
                    <Box>
                        <SectionGeneric {...field} key={field.id} />
                    </Box>
                )
            })}
        </AnuarioEstadistico>
    );
}

export default Demografia;