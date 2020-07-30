import React from 'react';
import PropTypes from 'prop-types'
import { Box, Typography, Grid } from '@material-ui/core';
import styled from '@emotion/styled';

const Img = styled.img`
height: 500px;
`
const PageInicio = ({ fields }) => {
    return (
        <Box padding={2}>
            <Grid container spacing={5}>
                <Grid item md={6}>
                    <Box padding={0.5}>
                        <Typography variant="h3">{fields[0].value}</Typography>
                        <Typography component="p" align="justify" >
                            {fields[1].value}
                        </Typography>
                    </Box>
                    <Box padding={1}>
                        <Typography variant="h4">{fields[3].value}</Typography>
                        <Typography component="p" align="justify" >
                            {fields[4].value}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item md={6}>
                    <Box>
                        <Typography align="center" style={{paddingBottom: '0.5rem'}} variant="h4">Observatorio de movilidad</Typography>
                        <Img alt="imgmovidad" src={fields[5].value.url} />
                    </Box>
                </Grid>
            </Grid>
            <Box>
                <Typography align="center" variant="h4">Gráficas de Movilidad</Typography>

            </Box>

        </Box>
    );
}


PageInicio.propTypes = {
    fields: PropTypes.array.isRequired
}
export default PageInicio;