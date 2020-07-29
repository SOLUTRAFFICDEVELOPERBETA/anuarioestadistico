/* eslint-disable indent */

import React from 'react'
import { List } from '@material-ui/core'
import PropTypes from 'prop-types'
import Spinner from '../components/Spinner'
import PaginationBar from '../components/PaginationBar'

/**
 * Hook para mostrar una lista limitada.
 * @param {*} step Tamaño del arreglo
 */
const useFixedList = (step = 5) => {
  const [total, setTotal] = React.useState([])
  const [actual, setActual] = React.useState([])
  const [position, setPosition] = React.useState(0)
  const [maxPages, setMaxPages] = React.useState(1)
  const [load, setLoad] = React.useState(true)

  const onSkipNext = () => {
    setPosition(maxPages - 1)
    setLoad(true)
  }

  // Método para avanzar al siguiente grupo de la lista
  const onNext = () => {
    const size = position * step + step

    if (size > total.length) {
      setPosition(0)
      return
    }

    setPosition(position + 1)
    setLoad(true)
  }

  const onSkipBack = () => {
    setPosition(0)
    setLoad(true)
  }

  // Método para retroceder en la lista
  const onBack = () => {
    const size = position * step - step

    if (size < 0) {
      setPosition(0)
      return
    }

    setPosition(position - 1)
    setLoad(true)
  }

  /**
   * Componente a mostrar de la lista limitado
   * @param {{ itemRender }} props Propiedades del componente
   */
  const Container = ({ itemRender }) => (
    <>
      {load ? (
        <Spinner />
      ) : (
          <List>{actual.map((item) => itemRender(item))}</List>
        )}
      {maxPages > 0 ? (
        <PaginationBar
          onBack={onBack}
          onSkipBack={onSkipBack}
          showBack={position === 0}
          onNext={onNext}
          onSkipNext={onSkipNext}
          showNext={position === maxPages - 1}
          label={`Pagina ${position + 1} de ${maxPages}`}
        />
      ) : null}
    </>
  )

  Container.propTypes = {
    itemRender: PropTypes.any.isRequired
  }

  React.useEffect(() => {
    if (position > maxPages) {
      setPosition(0)
    }
  }, [position, maxPages])

  React.useEffect(() => {
    const max = Math.ceil(total.length / step)
    setMaxPages(max)
  }, [total, step])

  React.useEffect(() => {
    const frag = [...total]
    setActual(frag.splice(position * step, step))
    setTimeout(() => {
      setLoad(false)
    }, 500)
  }, [total, position, step])

  return [setTotal, Container, [...total]]
}

export default useFixedList
