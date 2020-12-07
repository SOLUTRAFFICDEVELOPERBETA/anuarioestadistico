import React from 'react';
import { Box, Typography } from '@material-ui/core';
import withAuth from '../HOC/withAuth'
import usePages from '../hooks/usePages';
import Spinner from '../components/Spinner';
import styled from '@emotion/styled';
import {compose, spacing, palette} from '@material-ui/system'

const BoxContainer = styled(Box)`
${compose(spacing, palette)}
`
/**
 * @description Página de acerca de nosotros
 * @see Spinner
 * Consulte los elementos utilizados en {@link https://material-ui.com/ | Material-ui}
 */
const Nosotros = () => {
    const dataNosotros = usePages('acercanosotros');

    if (!dataNosotros) return <Spinner />;

    const { fields } = dataNosotros[0];

    return (
        <BoxContainer padding={{xs: 1, xl: 3, lg: 3, md: 2}}>
            <Typography color="primary" variant="h3" align="center">
                {fields[0].value}
            </Typography>
            <Typography color="primary" component="p" align="justify">
                {fields[1].value}
            </Typography>
        </BoxContainer>
    );
};

export default withAuth(Nosotros);
