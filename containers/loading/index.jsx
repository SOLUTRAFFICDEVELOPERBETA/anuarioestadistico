import React from 'react'
import PropTypes from 'prop-types'
import Spinner from '../../components/Spinner'
import styled from '@emotion/styled'
import { Typography } from '@material-ui/core'

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
`

const LoadingContainer = ({ message }) => (
  <Container>
    <Typography
      display="block"
      align="center"
      color="primary"
      variant="h5"
    >
      {message}
    </Typography>
    <Spinner />
  </Container>
)

LoadingContainer.propTypes = {
  message: PropTypes.string
}

LoadingContainer.defaultProps = {
  message: 'Cargando...'
}

export default LoadingContainer
