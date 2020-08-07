import React from 'react';
import { Typography, Box, Button, Divider, ButtonGroup, Popper, Grow, ClickAwayListener, ListItem, Paper, List } from '@material-ui/core';
import PropTypes from 'prop-types'
import { Bar, Pie, Line, HorizontalBar, Doughnut, Bubble, Polar } from 'react-chartjs-2';
import fb from '../config/firebase'
import { randomColor, constants } from '../constants/graphics/color';
import { BAR_OPTIONS, HORIZONTAL_OPTIONS, LINE_OPTIONS, PIE_OPTIONS, POLAR_OPTIONS } from '../constants/chart'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { CloudUpload, ArrowDropUp, ArrowDropDown } from '@material-ui/icons';
import styled from '@emotion/styled'
import { UploadFile } from '../constants/files';
import shortid from 'shortid';
import AuthContext from '../contexts/auth';
import { Card, CardBody } from 'reactstrap';
import { css } from '@emotion/core'


// Contenedor de los gráficos
const GraphicCard = styled.div`
    border-radius: 5px; 

`

/**
 * Método que separa los datos de la cabeza de la tabla.
 * @param {Array} array Arreglo a revisar
 * @return {Array}
 */
function findLabelsData(array) {
    let head = []
    const data = []

    array.forEach(row => {
        const [label] = row
        if (label === 'etiquetas') {
            head = row
        } else {
            data.push(row)
        }
    })
    // console.log({ head, data })
    return [head, data]
}

/**
 * Componente para mostrar las gráficas del diagnostico
 * @param {*} props Propiedades del componente
 */
const Graphic = ({ title, description, data, options, index, onChange, defaultOption }) => {
    const { auth } = React.useContext(AuthContext)
    const [graphicType, setGraphicType] = React.useState(defaultOption)
    const [openOptions, setOpenOptions] = React.useState(false)
    const anchorRef = React.useRef(null)
    const [graphicData, setGraphicData] = React.useState();
    console.log("esta es la data que me llega de data", graphicData)



    /**
       * Función para el cierre del popper de opciónes
       * @param {event} event Evento del Popper
       */
    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return
        }

        setOpenOptions(false)
    }

    // Función de apertura y cierre de las opciones
    const handleToggle = () => {
        setOpenOptions((prevOpen) => !prevOpen)
    }
    React.useEffect(() => {
        const getInfo = info => {
            console.log("esta es la data de info", info)
            try {
                let labels = []; const datasets = []
                info.forEach((item, index) => {
                    const color = constants[index];
                    console.table(item)
                    const $data = Object.entries(item)
                    const [head, others] = findLabelsData($data)
                    datasets[index] = {
                        label: head[1],
                        data: others.map(d => d[1]),
                        fill: false,
                        borderColor: color,
                        backgroundColor: color,
                        pointBorderColor: color,
                        pointBackgroundColor: color,
                        pointHoverBackgroundColor: color,
                        pointHoverBorderColor: color,
                        datalabels: {
                            color: 'white',
                            backgroundColor: color,
                            align: 'center',
                            anchor: 'end',
                            padding: 2,
                            borderRadius: 2,
                            clamp: true,
                        }
                    },
                        labels = others.map(d => d[0])


                })
                return {
                    labels,
                    datasets
                }


            } catch (error) {
                return null;
            }
        };
        if (data) {
            setGraphicData(getInfo(data.data));
        }
        // eslint-disable-next-line
    }, [data])


    /**
     * Función para subir archivos a FireStorage
     * @param file Archivo a subir a FireStorage
     */
    const handleFilesUpload = async (files) => {
        const name = String(title).replace(/ /g, "_").toLowerCase();
        const [file] = files
        const url = await UploadFile(file, `anuarioestadistico/${shortid.generate()}${file.name}`, `${name}.csv`).then(url => url)
        const csv = await getCSVInfo(url.path);
        console.log("esta es la data que me llega de csv", csv)
        const body = {
            items: {
                ...url,
                data: csv.data
            }
        }
        onChange(body);
    }

    /**
     * Función para llamar el archivo de csv y obtener su información
     * @param path Ruta del archivo a obtener la información
     * (e.j) 'plsv/examples/example.csv'
     */
    const getCSVInfo = async path => {
        const readCSV = fb.functions.httpsCallable('onReadCSV');
        const csv = readCSV(path).then(res => {
            return { data: res.data }
        })
        return csv
    };

    // Componente para obtener el gráfico a mostrar
    const Graphic = () => {
        switch (graphicType) {
            default:
            case 'bar':
                return (
                    <Bar
                        width={400}
                        height={200}
                        data={graphicData}
                        options={BAR_OPTIONS}
                        plugins={[ChartDataLabels]}
                    />
                )
            case 'pie':
                return (
                    <Pie
                        width={400}
                        height={200}
                        data={graphicData}
                        options={PIE_OPTIONS}
                        plugins={[ChartDataLabels]}
                    />
                )
            case 'line':
                return (
                    <Line
                        width={400}
                        height={200}
                        data={graphicData}
                        options={LINE_OPTIONS}
                        plugins={[ChartDataLabels]}
                    />
                )
            case 'horizontal':
                return (
                    <HorizontalBar
                        width={400}
                        height={100}
                        data={graphicData}
                        options={HORIZONTAL_OPTIONS}
                        plugins={[ChartDataLabels]}
                    />
                )
            case 'doughnut':
                return (
                    <Doughnut
                        width={400}
                        height={200}
                        data={graphicData}

                        plugins={[ChartDataLabels]}
                    />
                )

            case 'polar':
                return (
                    <Polar
                        width={400}
                        height={100}
                        data={graphicData}
                        options={POLAR_OPTIONS}
                        plugins={[ChartDataLabels]}
                    />
                )
            // case 'bubble':
            //     return (
            //         <Bubble
            //             width={400}
            //             height={100}
            //             data={graphicData}

            //             plugins={[ChartDataLabels]}
            //         />
            //     )
        }
    }

    return (
        <Box>
            <Card css={css`
            width: 100%;
            padding-bottom: 30px;
            height: 100%;
            border: none;
            background-color: transparent;
            `}>
                <CardBody css={css`
                background-color: white;
                height: 100%;
                border-radius: 5px;
                flex: 1 1 auto;
                min-height: 1px;
                padding: 1.25rem;
                `}

                >
                    <div className="card__title" css={css`
                    margin-bottom: 30px;
                    text-transform: uppercase;
                    position: relative;
                    text-align: left;
                    `}>
                        <Typography css={css`
                        font-size: 13px;
                        font-weight: 700;
                        padding-bottom: 0.5rem;
                        `}
                            color="textPrimary"
                        >{title}</Typography>
                        <Typography component="P" color="textSecondary">{description}</Typography>
                    </div>
                    <GraphicCard>
                        <Graphic />
                    </GraphicCard>

                    <ButtonGroup
                        fullWidth
                        variant="text"
                        color="primary"
                        size="small"
                        ref={anchorRef}

                    >
                        <Button component="p" variant="text">{`Tipo de gráfica: ${graphicType}`}</Button>
                        <Button
                            size="small"
                            style={{
                                width: '4rem'
                            }}
                            onClick={handleToggle}
                        >
                            {openOptions ? <ArrowDropUp /> : <ArrowDropDown />}
                        </Button>
                    </ButtonGroup>

                    <Popper
                        open={openOptions}
                        anchorEl={anchorRef.current}
                        role={undefined}
                        transition
                        disablePortal
                        placement="bottom-end"
                    >
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                style={{
                                    transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'
                                }}
                            >
                                <Paper>
                                    <ClickAwayListener onClickAway={handleClose}>
                                        <List>
                                            {options.map((option) => (
                                                <ListItem
                                                    button
                                                    selected={option === graphicType}
                                                    disabled={option === graphicType}
                                                    key={option}
                                                    onClick={() => setGraphicType(option)}
                                                >
                                                    {option.toUpperCase()}
                                                </ListItem>
                                            ))}
                                        </List>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                    {auth && (
                        <>
                            <input
                                type={'file'}
                                name={`anuario_${index}`}
                                accept="text/csv"
                                id={`anuario_${index}`}
                                multiple={false}
                                style={{ display: 'none' }}
                                onChange={(e) => handleFilesUpload(e.target.files)}
                            />
                            <label htmlFor={`anuario_${index}`}>
                                <Button
                                    endIcon={<CloudUpload />}
                                    component={'div'}
                                    size={'small'}
                                    fullWidth={true}
                                    variant={'contained'}
                                    color={'secondary'}
                                >
                                    Actualizar información
                           </Button>
                            </label>
                        </>
                    )}
                </CardBody>
            </Card>
        </Box>
    )
}

Graphic.propTypes = {
    defaultOption: PropTypes.string
}
export default Graphic;