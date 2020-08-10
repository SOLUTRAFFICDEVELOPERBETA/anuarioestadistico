import React from 'react';
import PropTypes from 'prop-types'
import { Box, Typography, Grid } from '@material-ui/core';

const PageInicio = ({ fields }) => {
    return (
        <Box
            style={{ background: '#f2f4f7' }}
            paddingLeft={2}
            paddingRight={2}>
            <Grid container spacing={5}>
                <Grid item md={6}>
                    <Box padding={0.5}>
                        <Typography
                            style={{ marginBottom: '0.5rem' }}
                            variant="h5"
                            style={{
                                fontWeight: 700
                            }}
                            color="textPrimary">{fields[1].value}</Typography>
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
                            align="justify" >
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
}


PageInicio.propTypes = {
    fields: PropTypes.array.isRequired
}
export default PageInicio;