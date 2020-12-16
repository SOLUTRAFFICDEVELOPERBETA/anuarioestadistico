import React from 'react';
import PropTypes from 'prop-types';
// import styled from '@emotion/styled'
import { Box, makeStyles, Paper, Typography, useTheme } from '@material-ui/core';

import {
    CHART_AREA,
    CHART_BAR,
    CHART_COMPOSE,
    CHART_LINE,
    CHART_PIE,
    CHART_RADAR,
    CHART_RADIAL
} from '../constants/chart';
import * as Recharts from 'recharts';
import { randomHexColorCode } from '../constants/colors';
import { grey } from '@material-ui/core/colors';

/**
 * Método para obtener el radio interno y externo para los charts de pastel
 * @param {number} size Numero de elementos en el chart de pastel
 * @param {number} index Posición del grupo dentro del arreglo
 */
const getRadius = (size, index) => {
    const unit = 100 / size;

    return [0 + unit * index + unit * 0.2, unit + unit * index - unit * 0.2];
};

const useStyles = makeStyles(({
    payload: {
        display: 'grid',
        width: 500,
        gridTemplateColumns: '1fr 1fr'
    }
}));
const ChartLineLabel = ({ x, y, stroke, value }) => {
    const theme = useTheme();

    const size = value.toString().length;
    const width = size * 10;

    const { light, main } = theme.palette.augmentColor({ main: stroke });

    return (
        <g>
            <rect
                x={x - width / 2}
                y={y - 20}
                rx={2}
                ry={2}
                width={width}
                height={15}
                fill={light}
                stroke={main}
            />
            <text
                x={x}
                y={y}
                dy={-10}
                fill={theme.palette.getContrastText(stroke)}
                fontSize={10}
                textAnchor="middle">
                {value}
            </text>
        </g>
    );
};

/**
 * Componente para mostrar la etiqueta de calor para los Gráficos lineares
 * @param {{ x: number, y: number, stroke: string, value: any }} props Propiedades del componente
 */
ChartLineLabel.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    stroke: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

/**
 * Componente para mostrar el valor de las etiquetas para los gráficos de barras
 * @param {{ x: number, y: number, width: number, value: any, stroke: string }} props Propiedades del componente
 */
const ChartBarLabel = ({ x, y, width, value, stroke }) => {
    const theme = useTheme();

    const size = value.toString().length;
    const { main, light, contrastText } = theme.palette.augmentColor({ main: stroke });

    if (size * 10 > width) return null;

    return (
        <g>
            <rect x={x} y={y - 20} width={width} height={15} fill={light} stroke={main} />
            <text
                x={x + width / 2}
                y={y}
                dy={-10}
                fill={contrastText}
                fontSize={10}
                textAnchor="middle">
                {value}
            </text>
        </g>
    );
};

ChartBarLabel.propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    width: PropTypes.number,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    stroke: PropTypes.number
};

/**
 * Componente para mostrar la etiqueta del valor simple para los gráficos de barras
 * @param {{ x: number, y: number, width: number, height: number, value: any, stroke: string }} props Propiedades del componente
 */

const ChartBarLabelSimple = ({ x, y, width, height, value, stroke }) => {
    const theme = useTheme();

    const size = value.toString().length;
    const { contrastText } = theme.palette.augmentColor({ main: stroke });

    if (size * 10 > width || height < 12) return null;

    return (
        <text x={x + width / 2} y={y + 10} fill={contrastText} fontSize={10} textAnchor="middle">
            {value}
        </text>
    );
};

ChartBarLabelSimple.propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    value: PropTypes.number,
    stroke: PropTypes.string
};


/**
 * @description Tooltip para los gráficos de Pie
 * @param {{ payload: Array }} props Propiedades del componente
 */
const ChartPieTooltip = ({ payload = [] }) => {
    const classes = useStyles()
    return (
        <React.Fragment>
            <Box paddingY={1} paddingX={2} component={Paper} variant="outlined">
                <Box className={classes.payload}>
                    {payload.map((section, index) => {

                        const { name, value, payload, dataKey } = section;

                        const { fill } = payload;

                        return (
                            <div key={`tooltip-pie-${name}-${index}`} style={{ marginBottom: 4 }}>
                                <Typography variant="h5" color="primary" gutterBottom>
                                    {name}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    display="block"
                                    style={{
                                        color: grey[600],
                                        fontWeight: 500,
                                        textTransform: 'uppercase',
                                        fontSize: 10
                                    }}>
                                    {dataKey}
                                </Typography>
                                <Typography
                                    variant="h6"
                                    display="block"
                                    gutterBottom
                                    style={{
                                        color: fill
                                    }}>
                                    {value}
                                </Typography>
                            </div>
                        );
                    })}
                </Box>
            </Box>
        </React.Fragment>
    )
};

ChartPieTooltip.propTypes = {
    payload: PropTypes.array.isRequired
};

/**
 * @description Tooltip personalizado para los gráficos
 * @param {{ active: boolean, payload: Array, label: string }} props Propiedades del componente
 */
const CustomTooltip = ({ active, payload, label }) => {
    const classes = useStyles()
    return active ? (
        <Box
            paddingY={1}
            paddingX={2}
            component={Paper}
            variant="outlined">
            <Typography variant="h5" color="primary" gutterBottom>
                {label}
            </Typography>

            <Box className={classes.payload}>
                {payload.map((section, key) => {
                    const { color, name, unit, value } = section;
                    return (
                        <div
                            key={key}
                            style={{
                                color,
                                marginBottom: 4,
                            }}>
                            <Typography
                                align="left"
                                variant="caption"
                                display="block"
                                style={{
                                    color: grey[600],
                                    fontWeight: 500,
                                    textTransform: 'uppercase',
                                    fontSize: 10
                                }}>
                                {name}
                            </Typography>
                            <Typography
                                align="right"
                                variant="h6"
                                color="inherit"
                                display="inline"
                                style={{
                                    marginRight: 4
                                }}>
                                {value}
                            </Typography>
                            <Typography
                                variant="caption"
                                color="inherit"
                                display="inline"
                                style={{ fontStyle: 'italic' }}>
                                {unit}
                            </Typography>
                        </div>
                    );
                })}
            </Box>
        </Box>
    ) : null
}


CustomTooltip.propTypes = {
    active: PropTypes.bool.isRequired,
    payload: PropTypes.array.isRequired,
    label: PropTypes.string.isRequired
};

/**
 * @description Componente para mostrar una imagen en los puntos de un gráfico de linea
 * @param {{ cx: number, cy: number, id: string, stroke: string, href: string }} props Propiedades del componente
 */
const ImageDot = ({ cx, cy, id, stroke, href }) => {
    if (href) {
        return (
            <svg x={cx - 15} y={cy - 15} width={30} height={30}>
                <defs>
                    <clipPath id={`dot-${id}`}>
                        <circle x={cx - 15} cx={30} y={cy - 15} cy={30} r={15} fill={stroke} />
                    </clipPath>
                </defs>
                <image width={30} height={30} xlinkHref={href} clipPath={`dot-${id}`} />
            </svg>
        );
    }

    return (
        <svg x={cx - 10} y={cy - 10} width={20} height={20}>
            <circle x={cx - 10} cx={10} y={cy - 10} cy={10} r={5} fill="#fff" stroke={stroke} />
        </svg>
    );
};

ImageDot.propTypes = {
    cx: PropTypes.number.isRequired,
    cy: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    stroke: PropTypes.string.isRequired,
    href: PropTypes.any
};


/**
 * @description Componente para el elemento de los Gráficos de los documentos
 * @param {String} id
 * @param { data: {}, type: string } value
 * Consulte los elementos utilizados para las gráfica en {@link https://recharts.org/en-US/blog | <Rechart />}
 */

const ChartGraphic = ({ id, value }) => {
    const theme = useTheme();
    const valueChart = {
        data: value.data || {},
        type: value.type || CHART_LINE
    };

    const { data, type } = valueChart;
    const getChart = () => {
        const { keys = [], fields = [], legend = true } = data;
        if (keys.length !== 0) {
            switch (type) {
                case CHART_LINE:
                    return (
                        <Recharts.ResponsiveContainer
                            debounce={1}
                            width="100%"
                            height={300}>
                            <Recharts.LineChart
                                data={fields}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5
                                }}>
                                <Recharts.CartesianGrid strokeDasharray="3 3" />
                                <Recharts.XAxis
                                    dataKey="name"
                                    padding={{ left: 20, right: 20 }} />
                                <Recharts.YAxis padding={{ top: 40 }} domain={[0, 'dataMax']} />

                                <Recharts.Brush
                                    dataKey="name"
                                    height={30}
                                    width="50%"
                                    stroke={theme.palette.primary.main}
                                />

                                {legend && <Recharts.Legend
                                    width="100%"
                                    wrapperStyle={{
                                        backgroundColor: '#f5f5f5',
                                        border: `2px dashed ${theme.palette.secondary.light}`,
                                        borderRadius: 5,
                                        lineHeight: '25px'
                                    }}
                                />
                                }
                                {keys.map(($key) => {
                                    const {
                                        key,
                                        type = 'monotone',
                                        label = true,
                                        unit = '',
                                        icon = { url: null },
                                        disabled = false,
                                        color = randomHexColorCode()
                                    } = $key;

                                    if (disabled) return null;

                                    return (
                                        <Recharts.Line
                                            legendType="triangle"
                                            key={key}
                                            id={`line-chart-${key}`}
                                            type={type}
                                            dataKey={key}
                                            stroke={color}
                                            strokeDasharray="3 4 5 2"
                                            unit={unit}
                                            dot={
                                                <ImageDot id={`line-icon-${key}`} href={icon.url} />
                                            }
                                            activeDot={{ r: 8 }}
                                            label={label && <ChartLineLabel stroke={color} />}
                                        />
                                    );
                                })}
                            </Recharts.LineChart>
                        </Recharts.ResponsiveContainer>
                    );
                case CHART_BAR:
                    return (
                        <Recharts.ResponsiveContainer debounce={1} width="100%" height={300}>
                            <Recharts.BarChart
                                data={fields}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5
                                }}>
                                <Recharts.CartesianGrid strokeDasharray="3 3" />
                                <Recharts.XAxis dataKey="name" padding={{ left: 20, right: 20 }} />
                                <Recharts.YAxis padding={{ top: 20 }} domain={[0, 'dataMax']} />
                                {legend && <Recharts.Legend
                                    width="100%"
                                    wrapperStyle={{
                                        backgroundColor: '#f5f5f5',
                                        border: `2px dashed ${theme.palette.secondary.light}`,
                                        borderRadius: 5,
                                        lineHeight: '25px'
                                    }}
                                />}
                                <Recharts.Tooltip content={<CustomTooltip />} />
                                <Recharts.Brush
                                    dataKey="name"
                                    height={30}
                                    stroke={theme.palette.primary.main}
                                />
                                {keys.map(($key) => {
                                    const {
                                        key,
                                        unit = '',
                                        disabled = false,
                                        label = true,
                                        stackId = '',
                                        color = randomHexColorCode()
                                    } = $key;

                                    if (disabled) return null;

                                    return (
                                        <Recharts.Bar
                                            legendType="square"
                                            key={key}
                                            id={`bar-chart-${key}`}
                                            dataKey={key}
                                            fill={color}
                                            unit={unit}
                                            stackId={stackId.trim() !== '' ? stackId : key}
                                            label={
                                                label &&
                                                (stackId === '' ? (
                                                    <ChartBarLabel stroke={color} />
                                                ) : (
                                                        <ChartBarLabelSimple stroke={color} />
                                                    ))
                                            }
                                        />
                                    );
                                })}
                            </Recharts.BarChart>
                        </Recharts.ResponsiveContainer>
                    );
                case CHART_AREA:
                    return (
                        <Recharts.ResponsiveContainer debounce={1} width="100%" height={300}>
                            <Recharts.AreaChart
                                data={fields}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5
                                }}>
                                <Recharts.CartesianGrid strokeDasharray="3 3" />
                                <Recharts.XAxis dataKey="name" padding={{ left: 20, right: 20 }} />
                                <Recharts.YAxis padding={{ top: 20 }} domain={[0, 'dataMax']} />
                                {legend && (
                                    <Recharts.Legend
                                        width="100%"
                                        wrapperStyle={{
                                            backgroundColor: '#f5f5f5',
                                            border: `2px dashed ${theme.palette.secondary.light}`,
                                            borderRadius: 5,
                                            lineHeight: '25px'
                                        }}
                                    />)}
                                <Recharts.Tooltip content={<CustomTooltip />} />
                                <Recharts.Brush
                                    dataKey="name"
                                    height={30}
                                    stroke={theme.palette.primary.main}
                                />
                                {keys.map(($key) => {
                                    const {
                                        key,
                                        type = 'monotone',
                                        unit = '',
                                        disabled = false,
                                        color = randomHexColorCode()
                                    } = $key;

                                    const { main, light } = theme.palette.augmentColor({
                                        main: color
                                    });

                                    if (disabled) return null;

                                    return (
                                        <Recharts.Area
                                            legendType="circle"
                                            key={key}
                                            type={type}
                                            id={`bar-chart-${key}`}
                                            dataKey={key}
                                            stackId={`area-${id}`}
                                            fill={light}
                                            stroke={main}
                                            unit={unit}
                                            activeDot={{ r: 6 }}
                                        />
                                    );
                                })}
                            </Recharts.AreaChart>
                        </Recharts.ResponsiveContainer>
                    );
                case CHART_PIE:
                    return (
                        <Recharts.ResponsiveContainer debounce={1} width="100%" height={300}>
                            <Recharts.PieChart
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5
                                }}>
                                <Recharts.Tooltip content={<ChartPieTooltip />} />
                                {keys
                                    .filter(({ disabled = false }) => !disabled)
                                    .map(($key, index) => {
                                        const { key, color = randomHexColorCode() } = $key;

                                        const [inner, outer] = getRadius(
                                            [...keys].filter(({ disabled }) => !disabled).length,
                                            index
                                        );

                                        return (
                                            <Recharts.Pie
                                                legendType="circle"
                                                key={key}
                                                data={fields}
                                                innerRadius={inner}
                                                outerRadius={outer}
                                                id={`pie-chart-${key}`}
                                                paddingAngle={index === 0 ? 0 : 5}
                                                dataKey={key}
                                                fill={color}
                                            />
                                        );
                                    })}
                                <Recharts.Tooltip />
                            </Recharts.PieChart>
                        </Recharts.ResponsiveContainer>
                    );
                case CHART_RADIAL: {
                    const { key, color = randomHexColorCode() } = keys[0];

                    const { main, light, contrastText } = theme.palette.augmentColor({
                        main: color
                    });
                    return (
                        <Recharts.ResponsiveContainer width="100%" debounce={1} height={300}>
                            <Recharts.RadialBarChart innerRadius={20} data={fields}>
                                <Recharts.RadialBar
                                    legendType="circle"
                                    minAngle={20}
                                    fill={main}
                                    label={{ position: 'end', fill: contrastText }}
                                    background={{ fill: light }}
                                    clockWise
                                    dataKey={key}
                                />
                                <Recharts.Legend
                                    iconSize={20}
                                    width={120}
                                    height={140}
                                    layout="horizontal"
                                    verticalAlign="middle"
                                    wrapperStyle={{
                                        top: 0,
                                        left: 650,
                                        lineHeight: '24px',
                                        border: `2px dashed ${theme.palette.secondary.light}`,
                                        borderRadius: 5,
                                    }} />
                            </Recharts.RadialBarChart>
                        </Recharts.ResponsiveContainer>
                    );
                }
                case CHART_RADAR:
                    return (
                        <Recharts.ResponsiveContainer width="100%" debounce={1} height={300}>
                            <Recharts.RadarChart data={fields}>
                                <Recharts.PolarGrid />
                                <Recharts.PolarAngleAxis dataKey="name" />
                                <Recharts.PolarRadiusAxis />
                                <Recharts.Tooltip content={<CustomTooltip />} />
                                {keys.map(($key) => {
                                    const {
                                        key,
                                        unit = '',
                                        disabled = false,
                                        color = randomHexColorCode()
                                    } = $key;

                                    const { main, light } = theme.palette.augmentColor({
                                        main: color
                                    });

                                    if (disabled) return null;

                                    return (
                                        <Recharts.Radar
                                            legendType="circle"
                                            key={key}
                                            type={type}
                                            id={`bar-chart-${key}`}
                                            fillOpacity={0.6}
                                            dataKey={key}
                                            fill={light}
                                            stroke={main}
                                            unit={unit}
                                        />
                                    );
                                })}
                                <Recharts.Tooltip />
                                {legend && <Recharts.Legend iconSize={10}
                                    width="100%"
                                    wrapperStyle={{
                                        backgroundColor: '#f5f5f5',
                                        border: `2px dashed ${theme.palette.secondary.light}`,
                                        borderRadius: 5,
                                        lineHeight: '25px'
                                    }}
                                />}
                            </Recharts.RadarChart>
                        </Recharts.ResponsiveContainer>
                    );
                case CHART_COMPOSE:
                    return (
                        <Recharts.ResponsiveContainer debounce={1} width="100%" height={300}>
                            <Recharts.ComposedChart
                                data={fields}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5
                                }}>
                                <Recharts.CartesianGrid strokeDasharray="3 3" />
                                <Recharts.XAxis dataKey="name" padding={{ left: 20, right: 20 }} />
                                <Recharts.YAxis padding={{ top: 20 }} domain={[0, 'dataMax']} />
                                {legend && <Recharts.Legend
                                    width="100%"
                                    wrapperStyle={{
                                        backgroundColor: '#f5f5f5',
                                        border: `2px dashed ${theme.palette.secondary.light}`,
                                        borderRadius: 5,
                                        lineHeight: '25px'
                                    }}
                                />}
                                <Recharts.Tooltip content={<CustomTooltip />} />
                                <Recharts.Brush
                                    dataKey="name"
                                    height={30}
                                    stroke={theme.palette.primary.main}
                                />
                                {keys.map(($key) => {
                                    const {
                                        key,
                                        type = 'monotone',
                                        unit = '',
                                        format = CHART_LINE,
                                        disabled = false,
                                        color = randomHexColorCode()
                                    } = $key;

                                    if (disabled) return null;

                                    switch (format) {
                                        case CHART_LINE:
                                            return (
                                                <Recharts.Line
                                                    legendType="circle"
                                                    key={key}
                                                    id={`line-chart-${key}`}
                                                    type={type}
                                                    dataKey={key}
                                                    stroke={color}
                                                    unit={unit}
                                                    activeDot={{ r: 6 }}
                                                />
                                            );
                                        case CHART_BAR: {
                                            const { stackId = '' } = $key;
                                            const { light, main } = theme.palette.augmentColor({
                                                main: color
                                            });
                                            return (
                                                <Recharts.Bar
                                                    legendType="circle"
                                                    key={key}
                                                    id={`bar-chart-${key}`}
                                                    dataKey={key}
                                                    fill={light}
                                                    stroke={main}
                                                    stackId={stackId.trim() !== '' ? stackId : key}
                                                    fillOpacity={0.2}
                                                    unit={unit}
                                                />
                                            );
                                        }
                                        case CHART_AREA: {
                                            const { light, main } = theme.palette.augmentColor({
                                                main: color
                                            });
                                            return (
                                                <Recharts.Area
                                                    legendType="circle"
                                                    key={key}
                                                    type={type}
                                                    id={`area-chart-${key}`}
                                                    stackId={`area-${id}`}
                                                    dataKey={key}
                                                    fill={light}
                                                    stroke={main}
                                                    fillOpacity={0.2}
                                                    unit={unit}
                                                    activeDot={{ r: 6 }}
                                                />
                                            );
                                        }
                                        default:
                                            return null;
                                    }
                                })}
                            </Recharts.ComposedChart>
                        </Recharts.ResponsiveContainer>
                    );
                default:
                    return <p>{type}</p>;
            }
        }
    };

    return (
        <React.Fragment>
            <Box>
                <div style={{ width: '95%' }}>{getChart()}</div>
            </Box>
        </React.Fragment>
    );
};

ChartGraphic.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    value: PropTypes.object,
};

export default ChartGraphic;
