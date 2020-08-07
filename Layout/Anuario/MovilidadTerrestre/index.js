import React from 'react';
import { MenuTabsSubModulos } from '../../../components/menuDropdown';
import { terrestrialMobility } from '../../../constants';
import usePages from '../../../hooks/usePages';
import Spinner from '../../../components/Spinner';
import AnuarioEstadistico from '..';
const TerrestrialMobility = () => {
    const dataInicio = usePages('Inicio')

    if (!dataInicio) return <Spinner />
    return (
        <AnuarioEstadistico>
            <div>
                <MenuTabsSubModulos data={terrestrialMobility} />
            </div>
        </AnuarioEstadistico>
    );
}

export default TerrestrialMobility;