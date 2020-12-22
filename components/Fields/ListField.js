import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import {
    TextField,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Tooltip,
    Box,
    Popover,
    Grid,
    MenuItem,
    InputAdornment,
    makeStyles
} from '@material-ui/core';
import { AddBoxTwoTone, Close, DeleteForever, DragHandle } from '@material-ui/icons';
import { DragPreviewImage, useDrag } from 'react-dnd';
import clsx from 'clsx';
import { grey } from '@material-ui/core/colors';
import { GRID_SIZES } from '../../constants/documents';

// Componente contenedor de la lista
const ListContainer = styled(Box)`
    width: 100%;
    padding: 1rem;
    display: grid;
    grid-template-columns: 0px auto;

    :focus-within {
        background-color: #eee;
        z-index: 5;
        -webkit-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
        -moz-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
        box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
    }

    :hover {
        grid-template-columns: 30px auto;
    }

    .dragger {
        align-self: center;
        justify-self: center;
        width: 24px;
        height: 24px;
        visibility: hidden;
        opacity: 0;
        transition: visibility 0s, opacity 0.5s linear;
    }

    :hover .dragger {
        visibility: visible;
        opacity: 1;
    }

    .dragger:hover {
        cursor: move;
    }
`;

// Campo del elemento
const ElementField = styled.div`
    width: 100%;
    display: inline-block;

    :hover {
        background-color: rgb(245, 245, 245);
    }

    :focus {
        border: 1px solid #ccc;
        border-radius: 5px;
        background-color: rgb(245, 245, 245);
        padding: 4px;
    }
`;

// Contenedor del elemento de la lista
const ElementItem = styled(ListItem)`
    .MuiListItemSecondaryAction-root {
        display: none;
    }

    :hover .MuiListItemSecondaryAction-root {
        display: block;
    }
`;

// Estilos del componente
const useStyles = makeStyles((theme) => ({
    dragging: {
        backgroundColor: '#eee',
        // z-index: 5,
        boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)'
    },
    item: {
        [theme.breakpoints.up('md')]: {
            maxWidth: '50rem'
        },
        [theme.breakpoints.between('sm', 'md')]: {
            maxWidth: '25rem'
        }
    }
}));

/**
 * @description Componente que muestra una lista de elementos
 * @param {String} id
 * @param {any} value
 * @param {Number} size
 * @param {Boolean} child
 * @param {Boolean} disableGrid
 * @param {func:() => void} onChange
 * @param {func:() => void} onDelete
 * Consulte los elementos utilizados en {@link https://material-ui.com/ | Material-ui}
 * consulte los elementos DragPreviewImage, useDrag en {@link https://react-dnd.github.io/react-dnd/docs/overview | React DnD Drag and Drop for React}
 */
const ListField = ({ id, value, size, onChange, onDelete }) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [element, setElement] = React.useState('');
    const [{ isDragging }, drag, preview] = useDrag({
        item: { type: 'ITEM', id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    });

    /**
     * Método para abrir el popover
     * @param {Event} event Evento de click de la celda
     */
    const handleClick = (event) => {
        event.preventDefault();
        setAnchorEl(event.currentTarget);
    };

    // Método para cerrar el popover
    const handleClose = () => {
        setAnchorEl(null);
    };

    /**
     * Método de ingreso a la lista
     * @param {{ field: string }} values Campo del formulario
     */
    const onCreateElement = (event) => {
        event.preventDefault();
        // console.log({ element })
        if (element.trim() === '') return;

        const fields = [...value, element];
        setElement('');
        onChange({ value: fields });
    };

    /**
     * Método de cambio de los elementos
     * @param {Event} event Evento de cambio
     */
    const handleChangeElement = ({ target }) => {
        const fields = [...value].map((v, i) =>
            i.toString() === target.id ? target.textContent : v
        );
        onChange({ value: fields });
    };

    /**
     * Método de eliminación de la lista
     * @param {number} index Posición del elemento
     */
    const handleDeleteElement = (index) => {
        const fields = [...value].filter((_, _index) => _index !== index);
        onChange({ value: fields });
    };

    const open = Boolean(anchorEl);

    return (
        <React.Fragment>
            <DragPreviewImage connect={preview} src="/static/img/DragPreview.png" />
            <ListContainer
                ref={drag}
                padding={3}
                onContextMenu={handleClick}
                className={clsx({
                    [classes.dragging]: isDragging
                })}>
                <span className="dragger">
                    <DragHandle fontSize="small" style={{ fill: grey[500] }} />
                </span>
                <div>
                    <List dense>
                        {value.map((v, index) => (
                            <ElementItem key={index}>
                                <ListItemText
                                    primary={
                                        <ElementField
                                            contentEditable
                                            id={index}
                                            className={classes.item}
                                            onBlur={handleChangeElement}
                                            dangerouslySetInnerHTML={{ __html: v }}
                                        />
                                    }
                                />
                                <ListItemSecondaryAction>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleDeleteElement(index)}>
                                        <Tooltip title="Borrar elemento" placement="left">
                                            <Close color="error" fontSize="small" />
                                        </Tooltip>
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ElementItem>
                        ))}
                    </List>
                    <form onSubmit={onCreateElement}>
                        <TextField
                            fullWidth
                            margin="dense"
                            size="small"
                            // variant="outlined"
                            name="field"
                            value={element}
                            placeholder="Añadir elemento"
                            onChange={(event) => setElement(event.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton type="submit">
                                            <AddBoxTwoTone color="primary" />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </form>
                </div>
            </ListContainer>
            {open && (
                <Popover
                    id={`popover-open-${id}`}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left'
                    }}
                    transformOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left'
                    }}>
                    <Box padding={1}>
                        <Grid container spacing={1} alignContent="center" alignItems="center">
                            <Grid item>
                                <TextField
                                    fullWidth
                                    label="Tamaño del objeto"
                                    select
                                    size="small"
                                    variant="outlined"
                                    value={size}
                                    name="size"
                                    style={{ minWidth: '160px' }}
                                    onChange={({ target: { value } }) => onChange({ size: value })}
                                    // className={classes.option}
                                >
                                    {GRID_SIZES.map(($size) => (
                                        <MenuItem
                                            disabled={size === $size.value}
                                            value={$size.value}
                                            key={`select-size-option-${id}-${$size.value}`}>
                                            {$size.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item>
                                <Tooltip title="Borrar" interactive>
                                    <IconButton size="small" onClick={() => onDelete(id)}>
                                        <DeleteForever color="error" />
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                        </Grid>
                    </Box>
                </Popover>
            )}
        </React.Fragment>
    );
};

ListField.propTypes = {
    id: PropTypes.string.isRequired,
    size: PropTypes.any,
    value: PropTypes.array,
    onChange: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default ListField;
