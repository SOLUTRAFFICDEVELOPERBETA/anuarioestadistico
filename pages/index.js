import React from 'react';
import Head from 'next/head'
import { css } from '@emotion/core'
import Layout from '../Layout';
import ImagBackground from '../components/imgBackground';
import PagesContext from '../contexts/pagess';
import Loading from '../components/Spinner'
import usePages from '../hooks/usePages';
import PageInicio from '../containers/pageInicio';

const Home = () => {
  const data = usePages('Inicio')
 
  if(!data) return <Loading/>
  const {title, id, fields} = data[0]
  return (
    <div>
      <ImagBackground imgSrc={fields[2].value.url} />
      <PageInicio fields={fields}/>
    </div>

  )
}

export default Home