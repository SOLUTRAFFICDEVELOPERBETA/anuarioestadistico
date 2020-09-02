/* eslint-disable prettier/prettier */
import React from 'react';
import ImagBackground from '../components/imgBackground';
import Loading from '../components/Spinner';
import usePages from '../hooks/usePages';
import { MenuTabsMain } from '../components/menuDropdown';
import { LinksMenu } from '../constants';
import { Tooltip, IconButton } from '@material-ui/core';
import { ArrowUpward } from '@material-ui/icons'

const Home = () => {
    const data = usePages('Inicio');

    if (!data) return <Loading />;
    const { fields } = data[0];

    const subirMain = () => {
        const jumbotron = document.querySelector('.jumbotron');
        jumbotron.scrollIntoView({ behavior: 'smooth' })
    }
    return (
        <div >
            <ImagBackground imgSrc={fields[0].value.url} title="Anuario Estadístico 2020" />
            <div>
                <div className="jumbotron">
                    <MenuTabsMain data={LinksMenu} />
                </div>
            </div>
            <div>
            <Tooltip title="Volver Arriba">
                <IconButton
                  variant="contained"
                  color="primary"
                  style={{
                    display: 'scroll',
                    position: 'fixed',
                    bottom: '2rem',
                    right: '-0.5rem'
                  }} onClick={(() => subirMain())}
                >
                  <ArrowUpward fontSize="large" />
                </IconButton>
              </Tooltip>
            </div>
        </div>
    );
};

export default Home;
