import React from 'react';
import { Box, Typography } from '@material-ui/core';
import withAuth from '../HOC/withAuth'
import usePages from '../hooks/usePages';
import Spinner from '../components/Spinner';

const Nosotros = () => {
    const dataNosotros = usePages('acercanosotros');

    if (!dataNosotros) return <Spinner />;

    const { fields } = dataNosotros[0];

    return (
        <Box padding={3}>
            <Typography color="primary" variant="h3" align="center">
                {fields[0].value}
            </Typography>
            <Typography color="primary" component="p" align="justify">
                {fields[1].value}
            </Typography>
        </Box>
    );
};

export default withAuth(Nosotros);
