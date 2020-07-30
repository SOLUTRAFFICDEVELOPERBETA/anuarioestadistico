import React from 'react';
import Head from 'next/head'
import { css } from '@emotion/core'
import Layout from '../Layout';
import ImagBackground from '../components/imgBackground';
import PagesContext from '../contexts/pagess';
import Loading from '../components/Spinner'
import usePages from '../hooks/usePages';
import PageInicio from '../containers/pageInicio';
import { Box } from '@material-ui/core';
import UploadCharts from '../components/uploadCharts';

const Home = () => {
  const data = usePages('Inicio')

  if (!data) return <Loading />
  const { title, id, fields } = data[0]
  return (
    <div>
      <ImagBackground imgSrc={fields[2].value.url} />
      <Box>
        <UploadCharts/>
      </Box>
      <div style={{ background: '#f2f4f7' }}>
        <PageInicio fields={fields} />

      </div>
    </div>

  )
}

export default Home