import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import {
    Box,
    Table,
    TableContainer,
    TableRow,
    TableBody,
    makeStyles,
    Paper,
    TableCell
} from '@material-ui/core';

const useStyles = makeStyles({
    table: {
        minWidth: 650
    }
});

// Contenedor de la celda
const CellContainer = styled(TableCell)`
    position: relative;
    max-width: 100px;
    min-width: 75px;
    background-color: ${(props) => props.cellColor};
    word-break: break-word;
    font-family: 'normal';
    font-style: ${(props) => (props.italic ? 'italic' : 'normal')};
    font-weight: ${(props) => (props.bold ? 'bold' : 'normal')} !important;
    font-family: 'Open Sans', sans-serif;
    color: ${(props) => props.textColor};
    font-size: ${(props) => props.textSize}px;
    font-weight: 400;
    letter-spacing: 0.00938em;
`;

/**
 * @description Componente que permite visualizar cualquier información que se le mande por los props.
 * @param { Object: { [{}]}} data Propiedades del componente.
 * Consulte los elementos utilizados en {@link https://material-ui.com/ | Material-ui}
 */
const TableGeneric = ({ data }) => {
    const classes = useStyles();
    return (
        <Box>
            <TableContainer component={Paper} elevation={0}>
                <Table className={classes.table} size="medium">
                    <TableBody>
                        {Object.values(data).map((row, key) => (
                            <TableRow key={key}>
                                {row.map((cell, index) => {
                                    const {
                                        bold,
                                        italic,
                                        textSize,
                                        textColor,
                                        cellColor,
                                        content
                                    } = cell;
                                    return (
                                        <CellContainer
                                            bold={bold}
                                            italic={italic}
                                            textSize={textSize}
                                            textColor={textColor}
                                            cellColor={cellColor}
                                            key={index}>
                                            {' '}
                                            {content}{' '}
                                        </CellContainer>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

TableGeneric.propTypes = {
    data: PropTypes.object.isRequired
};
export default TableGeneric;
