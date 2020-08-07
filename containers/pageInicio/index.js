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
                            variant="h4"
                            style={{
                                fontWeight: 700
                            }}
                            color="textPrimary">{fields[0].value}</Typography>
                        <Typography component="p" color="textSecondary" align="justify" >
                            {fields[1].value}
                        </Typography>
                    </Box>
                    <Box padding={1}>
                        <Typography
                            style={{
                                fontWeight: 700
                            }}
                            color="textPrimary"
                            variant="h4">{fields[3].value}</Typography>
                        <Typography
                            color="textSecondary"
                            component="p" align="justify" >
                            {fields[4].value}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item md={6}>
                    <Box>
                        <img alt="imgmovidad" src={'/static/img/LogoMovilidad.png'} width={600} height={400} />
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