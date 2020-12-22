import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Grid } from '@material-ui/core';

/**
 * @description Componente que permite visualizar la información del inicio de la plataforma.
 * @param { array[]} fields
 * Consulte los elementos utilizados en {@link https://material-ui.com/ | Material-ui}
 */
const PageInicio = ({ fields }) => {
    return (
        <Box
            style={{ background: '#f2f4f7' }}
            paddingLeft={1}
            paddingRight={1}
            paddingBottom={2}>
            <Grid container spacing={3}>
                <Grid item md={6}>
                    <Box>
                        <Typography
                            style={{ marginBottom: '0.5rem', fontWeight: 700 }}
                            variant="h5"
                            color="textPrimary">
                            {fields[1].value}
                        </Typography>
                        <Typography
                            style={{ marginBottom: '0.5rem' }}
                            component="p"
                            color="textSecondary"
                            align="justify">
                            {fields[2].value}
                        </Typography>
                        <Typography
                            style={{ marginBottom: '0.5rem' }}
                            component="p"
                            color="textSecondary"
                            align="justify">
                            {fields[3].value}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item md={6}>
                    <Box>
                        <img alt="imgmovidad" src={fields[4].value.url} width={600} height={400} />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

PageInicio.propTypes = {
    fields: PropTypes.array.isRequired
};
export default PageInicio;
