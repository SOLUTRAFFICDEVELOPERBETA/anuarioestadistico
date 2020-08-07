import React from 'react';
import { Box, Grid, Button, Typography } from '@material-ui/core'
import CsvContext from '../../../contexts/csv';
import Graphic from '../../../components/Graphic';
import GraphicForm from '../../../forms/GraphicForm';
import { GRAPHIC_TYPES } from '../../../constants/chart';
import AuthContext from '../../../contexts/auth';
import Filters from '../../../components/filters';
import usePages from '../../../hooks/usePages';
import Spinner from '../../../components/Spinner'
import styled from '@emotion/styled'
import SectionGeneric from '../../../components/section'

const ayers = ['2014', '2015', '2016', '2017', '2018', '2019']
const category = ['Automóviles', 'Camionetas', 'Camperos', '', 'Taxis', 'Bus', 'Busetas', 'Microbuses', 'Camiones']

const Mobility = () => {
    const { dataGraphi, createItemGraph } = React.useContext(CsvContext)
    const { auth } = React.useContext(AuthContext)
    const dataMovilidad = usePages('Movilidad')

    const handleChange = key => item => {
        const newData = { ...dataGraphi }
        newData.movilidad[key].items = item
        createItemGraph(newData)
    }
    const HandlenCreateItems = (data) => {
        console.log("esta es la data que me llega de data", data)
        const newData = { movilidad: [...dataGraphi.movilidad, data] }
        createItemGraph(newData)
    }
    if (!dataMovilidad) return <Spinner />
    return (
        <Box>
            {/* {auth && (
                <Box>
                    <Grid container xl={12} lg={12} md={6} alignItems="center">
                        <Grid>
                            <GraphicForm onsubmit={(data) => HandlenCreateItems(data)} />
                        </Grid>
                        <Grid item container direction="row" alignItems="center">
                            <Filters
                                options={ayers}
                                label="Años"
                                placeholder="Selecciona el año a filtrar"
                                onchange={(data) => console.log(data)} />
                            <Filters
                                label="Categoría"
                                placeholder="Seleccionar Categoría"
                                options={category}
                                onchange={(data) => console.log(data)} />

                            <Button
                                color="primary"
                                variant="outlined"
                                onClick={() => alert("Aplicando el filtro")} >Aplicar filtro</Button>
                        </Grid>

                    </Grid>

                </Box>
            )} */}
            {dataMovilidad[0].fields[0].value.map(field => {
                return (
                    <Box>
                        <SectionGeneric {...field} key={field.id} />
                    </Box>
                )
            })}
           
            <Grid xs={12} container direction="row">
                {dataGraphi && dataGraphi.movilidad.map((item, key) => (
                    <Grid item xl={6} md={6} lg={6} xs={3} style={{ padding: '12px' }}>
                        <Graphic
                            options={GRAPHIC_TYPES}
                            title={item.title}
                            description={item.description}
                            data={item.items}
                            index={key}
                            onChange={handleChange(key)}
                            key={key}
                            defaultOption={item.type}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default Mobility;