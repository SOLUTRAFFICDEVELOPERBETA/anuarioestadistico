/* eslint-disable prettier/prettier */
import React from 'react';
import ImagBackground from '../components/imgBackground';
import MainLayout from '../Layout/main'
import Loading from '../components/Spinner';
import usePages from '../hooks/usePages';
import { MenuTabsMain } from '../components/menuDropdown';
import { LinksMenu } from '../constants';
import { Tooltip, IconButton } from '@material-ui/core';
import { ArrowUpward } from '@material-ui/icons'

/**
 * @description Página principal de la plataforma
 * @see {@link https://material-ui.com/ | Material-ui}
 */
const Home = () => {
  const data = usePages('Inicio');

  if (!data) return <Loading />;
  const { fields } = data[0];

  const subirMain = () => {
    const jumbotron = document.querySelector('.jumbotron');
    jumbotron.scrollIntoView({ behavior: 'smooth' })
  }
  return (
    <MainLayout>
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
    </MainLayout>
  );
};

export default Home;
