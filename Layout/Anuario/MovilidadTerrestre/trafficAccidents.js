import React from 'react';
import usePages from '../../../hooks/usePages'
import Spinner from '../../../components/Spinner';
import SectionGeneric from '../../../components/section';
import { Typography, Grid, Box } from '@material-ui/core';
const TrafficAccidents = () => {
    const data = usePages("Movilidad")

    if (!data) return <Spinner />
    const { fields } = data[0]
    console.log("esta es la data de sections", fields)
    return (
        <div>

            {fields[1].value.map(field => {
                return (
                    <Box>
                        <SectionGeneric {...field} key={field.id} />
                    </Box>
                )
            })}

            {/* <Grid container xl={12} direction="row" spacing={2}>
                <Grid item xl={6} md={6} lg={6} >
                    <Typography
                        style={{ fontWeight: 700 }}
                        variant="h4"
                        color="primary">{fields[1].value[0].value}</Typography>
                    <Typography
                        style={{ fontWeight: 700 }}
                        variant="h6"
                        color="textPrimary">{fields[1].value[1].value}</Typography>
                    <Typography component="p" color="textSecondary">{fields[1].value[3].value}</Typography>
                </Grid>
                <Grid item xl={6} md={6} lg={6}>
                    <img width={500} height={300} src={'/static/img/victimasFatalesTasa.png'} alt="gráfica" />
                </Grid>
            </Grid>

            <Grid container xl={12} direction="row" spacing={2}>
                <Grid item xl={6} md={6} lg={6}>
                    <Typography
                        style={{ fontWeight: 700 }}
                        variant="h6" color="textPrimary">{fields[1].value[4].value}</Typography>

                    <Typography component="p" color="textSecondary">{fields[1].value[6].value}</Typography>
                </Grid>
                <Grid item xl={6} md={6} lg={6}>
                    <img width={500} height={300} src={'/static/img/victimasFatalesClase.png'} alt="gráfica" />
                </Grid>
            </Grid>

            <Grid container xl={12} direction="row" spacing={2}>
                <Grid item xl={6} md={6} lg={6}>
                    <Typography
                        style={{ fontWeight: 700 }}
                        variant="h6"
                        component="h1" color="textPrimary">{fields[1].value[7].value}</Typography>

                    <Typography component="p" color="textSecondary">{fields[1].value[9].value}</Typography>
                </Grid>
                <Grid item xl={6} md={6} lg={6}>
                    <img width={500} height={300} src={'/static/img/victimasFatalesEdad.png'} alt="gráfica" />
                </Grid>
            </Grid> */}

        </div>
    );
}

export default TrafficAccidents;