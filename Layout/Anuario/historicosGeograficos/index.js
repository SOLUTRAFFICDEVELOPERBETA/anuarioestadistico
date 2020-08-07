import React from 'react';
import { MenuTabsSubModulos } from '../../../components/menuDropdown';
import { terrestrialMobility } from '../../../constants';
import { Box } from '@material-ui/core';
import usePages from '../../../hooks/usePages';
import Spinner from '../../../components/Spinner';
import PageInicio from '../../../containers/pageInicio'
import SectionGeneric from '../../../components/section';
import AnuarioEstadistico from '..';

const HistoricosGeograficos = () => {
    const dataHistoricoGeograficos = usePages('HistoricosGeograficos')
    if (!dataHistoricoGeograficos) return <Spinner />
    return (
        <AnuarioEstadistico>

            {dataHistoricoGeograficos[0].fields.map(field => {
                return (
                    <Box>
                        <SectionGeneric {...field} key={field.id} />
                    </Box>
                )
            })}
        </AnuarioEstadistico>
    );
}

export default HistoricosGeograficos;