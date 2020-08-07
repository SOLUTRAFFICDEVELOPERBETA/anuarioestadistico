import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { Typography, Box, Grid } from '@material-ui/core'
import { Bar, Pie, Line, HorizontalBar, Doughnut } from 'react-chartjs-2'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { BAR_OPTIONS, GRAPHIC_TYPES, HORIZONTAL_OPTIONS, LINE_OPTIONS, PIE_OPTIONS } from '../constants/chart'
import Spinner from './Spinner'

// Contenedor de los gráficos
const GraphicCard = styled.div`
    border-radius: 5px;
    box-shadow: 10px 5px 5px #e2e2e2;
    .graph-title {
        text-align: center;
        color: #fff;
        background-color: var(--primary);
        padding: 0px 5px;
        border-radius: 5px
    }

    .graph-container {
        padding: 2rem;
    }
`

const GenericGraph = ({ title, data, defaultOption }) => {


    // Componente para obtener el gráfico a mostrar
    const Graphic = () => {
        switch (defaultOption) {
            default:
            case 'bar':
                return (
                    <Bar
                        data={data}
                        options={BAR_OPTIONS}
                        plugins={[ChartDataLabels]}
                    />
                )
            case 'pie':
                return (
                    <Pie
                        data={data}
                        options={PIE_OPTIONS}
                        plugins={[ChartDataLabels]}
                    />
                )
            case 'line':
                return (
                    <Line
                        data={data}
                        options={LINE_OPTIONS}
                        plugins={[ChartDataLabels]}
                    />
                )
            case 'horizontal':
                return (
                    <HorizontalBar
                        data={data}
                        options={HORIZONTAL_OPTIONS}
                        plugins={[ChartDataLabels]}
                    />
                )
            case 'doughnut':
                return (
                    <Doughnut
                        data={data}
                        options={PIE_OPTIONS}
                        plugins={[ChartDataLabels]}
                    />
                )
        }
    }

    if (!data) return <Spinner />

    return (
        <React.Fragment>
            <GraphicCard>
                <Box className="graph-title">

                    <Typography
                        variant="h6"
                        align="center"
                    >
                        {title}
                    </Typography>
                </Box>
                <div className="graph-container">
                    <Graphic />
                </div>
            </GraphicCard>
        </React.Fragment>
    )
}

GenericGraph.propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.object,
    options: PropTypes.arrayOf(PropTypes.oneOf(GRAPHIC_TYPES)),
    defaultOption: PropTypes.string
}

GenericGraph.defaultProps = {
    data: {
        labels: ['Dato 1', 'Dato 2', 'Dato 3', 'Dato 4'],
        datasets: [
            {
                backgroundColor: ['#629749', '#ffb04c', '#ff833a', '#f05545'],
                borderColor: ['#003d00', '#bc5100', '#ac1900', '#7f0000'],
                borderWidth: 1,
                hoverBackgroundColor: ['#33691e', '#f57f17', '#e65100', '#b71c1c'],
                hoverBorderColor: ['#003d00', '#bc5100', '#ac1900', '#7f0000'],
                data: [12, 5, 4, 16],
                datalabels: {
                    color: ['#629749', '#ffb04c', '#ff833a', '#f05545'],
                    backgroundColor: '#fff',
                    borderColor: ['#003d00', '#bc5100', '#ac1900', '#7f0000']
                }
            }
        ]
    },
    options: GRAPHIC_TYPES,
}

export default GenericGraph