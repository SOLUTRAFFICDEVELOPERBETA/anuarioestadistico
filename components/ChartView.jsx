import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import {
    Typography,
    ButtonGroup,
    Button,
    Popper,
    Grow,
    Paper,
    ClickAwayListener,
    List,
    ListItem,
    Box,
    Grid,
    IconButton,
    Tooltip
} from '@material-ui/core';
import { ArrowDropDown, ArrowDropUp, SaveTwoTone } from '@material-ui/icons';
import { Bar, Pie, Line, HorizontalBar, Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {
    BAR_OPTIONS,
    GRAPHIC_TYPES,
    HORIZONTAL_OPTIONS,
    LINE_OPTIONS,
    PIE_OPTIONS
} from '../constants/chart';
import Spinner from './Spinner';
import { downloadDoc } from '../constants/files';

// Contenedor de los gráficos
const GraphicCard = styled.div`
    border: 2px solid var(--primary);
    border-radius: 5px;

    .graph-title {
        color: #fff;
        background-color: var(--primary);
        padding: 0px 5px;
    }

    .graph-container {
        padding: 2rem;
        border-bottom: 2px solid var(--primary);
    }
`;

const ChartView = ({ title, options, data, defaultOption, disableDownload }) => {
    const [graphicType, setGraphicType] = React.useState(defaultOption);
    const [openOptions, setOpenOptions] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleDownloadCSV = () => {
        let csv = '';

        const { labels = [], datasets = [] } = data;

        csv += '&';
        csv += labels.join('&');
        csv += '\r\n';

        datasets.forEach((d) => {
            const { label = '' } = d;
            csv += `${label}&`;
            csv += d.data.join('&');
            csv += '\r\n';
        });

        console.log(csv);
        downloadDoc(csv, 'csv', `Datos ${title}`);
    };

    /**
     * Función para el cierre del popper de opciónes
     * @param {event} event Evento del Popper
     */
    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpenOptions(false);
    };

    // Función de apertura y cierre de las opciones
    const handleToggle = () => {
        setOpenOptions((prevOpen) => !prevOpen);
    };

    // Componente para obtener el gráfico a mostrar
    const Graphic = () => {
        switch (graphicType) {
            default:
            case 'bar':
                return <Bar data={data} options={BAR_OPTIONS} plugins={[ChartDataLabels]} />;
            case 'pie':
                return <Pie data={data} options={PIE_OPTIONS} plugins={[ChartDataLabels]} />;
            case 'line':
                return <Line data={data} options={LINE_OPTIONS} plugins={[ChartDataLabels]} />;
            case 'horizontal':
                return (
                    <HorizontalBar
                        data={data}
                        options={HORIZONTAL_OPTIONS}
                        plugins={[ChartDataLabels]}
                    />
                );
            case 'doughnut':
                return <Doughnut data={data} options={PIE_OPTIONS} plugins={[ChartDataLabels]} />;
        }
    };

    if (!data) return <Spinner />;

    return (
        <React.Fragment>
            <GraphicCard>
                <Box className="graph-title">
                    <Grid container alignItems="center" justify="space-between">
                        <Grid item>
                            <Typography variant="h6" align="center">
                                {title}
                            </Typography>
                        </Grid>
                        {!disableDownload && (
                            <Grid item>
                                <Tooltip title="Descargar datos como un CSV" interactive>
                                    <IconButton
                                        color="inherit"
                                        size="small"
                                        onClick={handleDownloadCSV}>
                                        <SaveTwoTone />
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                        )}
                    </Grid>
                </Box>
                <div className="graph-container">
                    <Graphic />
                </div>
                <ButtonGroup
                    fullWidth
                    variant="text"
                    color="primary"
                    size="small"
                    ref={anchorRef}
                    aria-label="split button">
                    <Button component="p">{`Tipo de gráfica: ${graphicType}`}</Button>
                    <Button
                        size="small"
                        style={{
                            width: '4rem'
                        }}
                        onClick={handleToggle}>
                        {openOptions ? <ArrowDropUp /> : <ArrowDropDown />}
                    </Button>
                </ButtonGroup>
            </GraphicCard>
            <Popper
                open={openOptions}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                placement="bottom-end">
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'
                        }}>
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <List>
                                    {options.map((option) => (
                                        <ListItem
                                            button
                                            selected={option === graphicType}
                                            disabled={option === graphicType}
                                            key={option}
                                            onClick={() => setGraphicType(option)}>
                                            {option.toUpperCase()}
                                        </ListItem>
                                    ))}
                                </List>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </React.Fragment>
    );
};

ChartView.propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.object,
    options: PropTypes.arrayOf(PropTypes.oneOf(GRAPHIC_TYPES)),
    disableDownload: PropTypes.bool,
    defaultOption: PropTypes.oneOf(GRAPHIC_TYPES)
};

ChartView.defaultProps = {
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
    disableDownload: false,
    options: GRAPHIC_TYPES,
    defaultOption: 'bar'
};

export default ChartView;
