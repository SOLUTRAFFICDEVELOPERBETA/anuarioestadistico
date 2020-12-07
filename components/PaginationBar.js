import React from 'react';
import { Box, Typography, Grid, IconButton } from '@material-ui/core';
import { ChevronLeft, ChevronRight, SkipPrevious, SkipNext } from '@material-ui/icons';
import PropTypes from 'prop-types';

/**
 * @description Barra de pagina para la lista limitada
 * @param {func: ()=> void} onNext
 * @param {func: ()=> void} onSkipNext
 * @param {Boolean} showNext
 * @param {func: ()=> void} onBack
 * @param {func: ()=> void} onSkipBack
 * @param {Boolean} showBack
 * @param {String} label
 * Consulte los elementos utilizados en {@link https://material-ui.com/ | Material-ui}
 */
const PaginationBar = ({ onNext, onSkipNext, showNext, onBack, onSkipBack, showBack, label }) => (
    <Box>
        <Grid container alignContent="center" alignItems="center" justify="flex-end">
            <Grid item xl={3} lg={3} md={3} sm={6} xs="auto">
                <Typography align="center" color="primary" variant="caption" display="block">
                    {label}
                </Typography>
            </Grid>
            <Grid item xl={2} lg={2} md={2} sm={6} xs="auto">
                <IconButton size="small" color="primary" onClick={onSkipBack} disabled={showBack}>
                    <SkipPrevious />
                </IconButton>
                <IconButton size="small" color="primary" onClick={onBack} disabled={showBack}>
                    <ChevronLeft />
                </IconButton>
                <IconButton size="small" color="primary" onClick={onNext} disabled={showNext}>
                    <ChevronRight />
                </IconButton>
                <IconButton size="small" color="primary" onClick={onSkipNext} disabled={showNext}>
                    <SkipNext />
                </IconButton>
            </Grid>
        </Grid>
    </Box>
);

PaginationBar.propTypes = {
    label: PropTypes.string,
    showNext: PropTypes.bool,
    showBack: PropTypes.bool,
    onNext: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    onSkipNext: PropTypes.func.isRequired,
    onSkipBack: PropTypes.func.isRequired
};

PaginationBar.defaultProps = {
    label: '',
    showBack: false,
    showNext: false
};
export default PaginationBar;
