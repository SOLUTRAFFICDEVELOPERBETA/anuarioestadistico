/* eslint-disable react/display-name */
// Módulos
import TerrestrialMobility from '../Layout/Anuario/MovilidadTerrestre';
import HistoricosGeograficos from '../Layout/Anuario/historicosGeograficos';
import Demografia from '../Layout/Anuario/demografia';
import Salud from '../Layout/Anuario/salud';
import Educacion from '../Layout/Anuario/educacion';
import Reacreacion from '../Layout/Anuario/recreacion';
import ServiciosPublicos from '../Layout/Anuario/serviciosPublicos';
import SeguridadConvivencia from '../Layout/Anuario/SeguridadConvivencia';
import ViolenciaIntrafamiliar from '../Layout/Anuario/violenciaIntrafamiliar';
import HaciendaPublica from '../Layout/Anuario/haciendaPublica';
import SectorFinanciero from '../Layout/Anuario/sectorFinanciero';
import SectorAgropecuario from '../Layout/Anuario/sectorAgropecuario';
import ConstruccionVivienda from '../Layout/Anuario/contruccionVivienda';
import SectorEmpresarial from '../Layout/Anuario/sectorEmpresarial';
import ComercioExterior from '../Layout/Anuario/comercioExterior';
import MovimientoAereo from '../Layout/Anuario/movimientoAereo';

export const PROFILE_IMG =
    'https://firebasestorage.googleapis.com/v0/b/wise-365ab.appspot.com/o/assets%2Fprofile_default.jpg?alt=media&token=9779b4ee-2ee5-49c1-b24b-720e5854867b';
export const AUTH_ITEM = 'WISE_AUTH';

// Fecha
export const INPUT_DATE = 'YYYY-MM-DD';

export const LinksMenu = [
    {
        label: 'Movilidad Terrestre',
        href: '#!',
        Component: function () {
            return <TerrestrialMobility />;
        }
    },
    {
        label: 'Aspectos  Históricos  y  Geográficos',
        href: '#!',
        Component: function () {
            return <HistoricosGeograficos />;
        }
    },
    {
        label: 'Demografía',
        href: '#!',
        Component: function () {
            return <Demografia />;
        }
    },
    {
        label: 'Salud',
        href: '#!',
        Component: function () {
            return <Salud />;
        }
    },
    {
        label: 'Educación',
        href: '#!',
        Component: function () {
            return <Educacion />;
        }
    },
    {
        label: 'Recreación y zonas verdes',
        href: '#!',
        Component: function () {
            return <Reacreacion />;
        }
    },
    {
        label: 'Servicios Público',
        href: '#!',
        Component: function () {
            return <ServiciosPublicos />;
        }
    },
    {
        label: 'Seguridad y convivencia',
        href: '#!',
        Component: function () {
            return <SeguridadConvivencia />;
        }
    },
    {
        label: 'Violencia Intrafamiliar',
        href: '#!',
        Component: function () {
            return <ViolenciaIntrafamiliar />;
        }
    },
    {
        label: 'Hacienda Pública',
        href: '#!',
        Component: function () {
            return <HaciendaPublica />;
        }
    },
    {
        label: 'Sector Financiero',
        href: '#!',
        Component: function () {
            return <SectorFinanciero />;
        }
    },
    {
        label: 'Sector Agropecuario',
        href: '#!',
        Component: function () {
            return <SectorAgropecuario />;
        }
    },
    {
        label: 'Construcción y vivienda',
        href: '#!',
        Component: function () {
            return <ConstruccionVivienda />;
        }
    },
    {
        label: 'Sector Empresarial',
        href: '#!',
        Component: function () {
            return <SectorEmpresarial />;
        }
    },
    {
        label: 'Comercio Exterior',
        href: '#!',
        Component: function () {
            return <ComercioExterior />;
        }
    },
    {
        label: 'Movimiento Aéreo',
        href: '#!',
        Component: function () {
            return <MovimientoAereo />;
        }
    }
];
