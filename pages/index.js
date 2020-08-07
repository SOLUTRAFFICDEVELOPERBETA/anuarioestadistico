import React from 'react';
import Head from 'next/head'
import { css } from '@emotion/core'
import Layout from '../Layout';
import ImagBackground from '../components/imgBackground';
import Loading from '../components/Spinner'
import usePages from '../hooks/usePages';
import PageInicio from '../containers/pageInicio';
import MenuDropdown, { MenuTabsMain } from '../components/menuDropdown';
import { LinksMenu } from '../constants';

const Home = () => {
  const data = usePages('Inicio')

  if (!data) return <Loading />
  const { title, id, fields } = data[0]
  return (
    <div>
      <ImagBackground imgSrc={fields[2].value.url} title="Anuario Estadístico 2020" />
      <div>
        
        <div>
          <MenuTabsMain data={LinksMenu} />
        </div>
      </div>
    </div>

  )
}

export default Home