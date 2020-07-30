import React from 'react'
import ChartView from '../components/ChartView'
import { GRAPHIC_TYPES, DEFAULT_CHART } from '../constants/chart'

/**
 * Hook para la implementación de gráficas
 * @param {string} title Titulo de la gráfica
 * @param {"bar" | "pie" | "line" | "doughnut" | "horizontal"} type Tipo de Gráfica
 * @param {Array<"bar" | "pie" | "line" | "doughnut" | "horizontal">} options Opciones de la Gráfica
 */
const useChart = (title = 'Gráfica', type = 'bar', options = GRAPHIC_TYPES, chart = DEFAULT_CHART) => {
  const [data, setData] = React.useState(chart)

  const Chart = () => (
    <ChartView title={title} defaultOption={type} options={options} data={data} />
  )

  return [setData, Chart]
}

export default useChart
