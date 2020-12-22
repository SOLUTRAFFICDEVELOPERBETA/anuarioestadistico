import React from 'react';
import PropTypes from 'prop-types';
import {
    TableContainer,
    Table,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    IconButton,
    Popover,
    TextField,
    Box,
    ButtonGroup,
    Button,
    Tooltip,
    Toolbar,
    makeStyles,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Divider
} from '@material-ui/core';
import styled from '@emotion/styled';
import {
    FormatColorFillTwoTone,
    FormatColorTextTwoTone,
    FormatBold,
    FormatItalic,
    MoreHoriz,
    KeyboardArrowRight,
    KeyboardArrowDown,
    Close,
    ViewArrayTwoTone,
    DragHandle
} from '@material-ui/icons';
import ColorPick from '../ColorPick';
import { red } from '@material-ui/core/colors';
import { DragPreviewImage, useDrag } from 'react-dnd';
import clsx from 'clsx';
import EmojiPicker from '../EmojiPicker';


// Contenedor de la celda
const CellContainer = styled(TableCell)`
    /*display: inline-block;*/
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
    line-height: 1.5;
    letter-spacing: 0.00938em;

    :hover {
        background-color: rgb(245, 245, 245, 0.5);
    }

    :focus {
        background-color: rgb(245, 245, 245, 0.5);
    }
`;

// Estilos de las celdas
// eslint-disable-next-line no-unused-vars
const useCellFieldStyles = makeStyles((theme) => ({
    rotate: {
        transform: 'rotate(90deg)'
    }
}));

// Campo de la celda
/**
 * Componente para mostrar el contenido de una celda
 * @param {{ id: string, content: string, textSize: string, bold: boolean, italic: boolean, cellColor: string, textColor: string, onChange: () => void, onDelete: () => void }} props Propiedades del componente
 */
const CellField = ({
    id,
    content,
    textSize,
    bold,
    italic,
    cellColor,
    textColor,
    onChange,
    onDelete
}) => {
    const classes = useCellFieldStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

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
     * Método para cambiar propiedades de la celda
     * @param {string} key Llave de la propiedad a cambiar
     * @param {string} value Valor a colocar
     */
    const handleTextChange = (key, value) => {
        onChange({ [key]: value });
    };

    const handlePushEmoji = ({ emoji }) => onChange({ content: `${content}${emoji}` });
    /**
     * Método para cambiar los colores de la celda
     * @param {string} key Llave de la propiedad a cambiar
     * @param {string} value Valor a colocar
     */
    const handleColorChange = (key, value) => {
        onChange({ [key]: value });
    };

    const open = Boolean(anchorEl);

    return (
        <React.Fragment>
            <Tooltip interactive title="Click para editar el contenido">
                <CellContainer
                    // component="div"
                    key={id}
                    bold={bold}
                    italic={italic}
                    textSize={textSize}
                    textColor={textColor}
                    cellColor={cellColor}
                    contentEditable
                    id={id}
                    dangerouslySetInnerHTML={{ __html: content }}
                    onBlur={(event) => handleTextChange('content', event.target.textContent)}
                    onContextMenu={handleClick}
                />
            </Tooltip>
            
            {open && (
                <Popover
                    id={`popover-open-${id}`}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}>
                    <Box padding={1}>
                        <ButtonGroup size="small" variant="text">
                            <Tooltip title="Color de texto">
                                <ColorPick
                                    icon={FormatColorTextTwoTone}
                                    color={textColor}
                                    onChange={(color) => handleColorChange('textColor', color)}
                                />
                            </Tooltip>
                            <Tooltip title="Color de celda">
                                <ColorPick
                                    icon={FormatColorFillTwoTone}
                                    color={cellColor}
                                    onChange={(color) => handleColorChange('cellColor', color)}
                                />
                            </Tooltip>
                            <Tooltip title="Insertar Emoji">
                                <EmojiPicker onSelect={handlePushEmoji} />
                            </Tooltip>
                            <Tooltip title="Negrilla">
                                <Button
                                    color={bold ? 'primary' : 'secondary'}
                                    onClick={() => onChange({ bold: !bold })}>
                                    <FormatBold />
                                </Button>
                            </Tooltip>
                            <Tooltip title="Cursiva">
                                <Button
                                    color={italic ? 'primary' : 'secondary'}
                                    onClick={() => onChange({ italic: !italic })}>
                                    <FormatItalic />
                                </Button>
                            </Tooltip>
                            <Tooltip title="Borrar Fila">
                                <Button color="secondary" onClick={() => onDelete('row')}>
                                    <ViewArrayTwoTone className={classes.rotate} />
                                </Button>
                            </Tooltip>
                            <Tooltip title="Borrar Columna">
                                <Button color="secondary" onClick={() => onDelete('column')}>
                                    <ViewArrayTwoTone />
                                </Button>
                            </Tooltip>
                        </ButtonGroup>
                        <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            margin="dense"
                            label="Tamaño de fuente"
                            type="number"
                            inputProps={{
                                min: 12,
                                max: 20
                            }}
                            name="textSize"
                            defaultValue={textSize}
                            value={textSize}
                            onChange={(event) => handleTextChange('textSize', event.target.value)}
                        />
                    </Box>
                </Popover>
            )}
        </React.Fragment>
    );
};

CellField.propTypes = {
    id: PropTypes.string.isRequired,
    content: PropTypes.string,
    textSize: PropTypes.string,
    bold: PropTypes.bool,
    italic: PropTypes.bool,
    cellColor: PropTypes.string,
    textColor: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

CellField.defaultProps = {
    content: '',
    textSize: '16',
    bold: false,
    italic: false,
    cellColor: '#fff',
    textColor: '#000'
};

// Contenedor de la Fila
const RowContainer = styled(TableRow)`
    .MuiTableCell-root:not(:last-child) {
        border-right: 1px solid #cccccc;
    }
`;

/**
 * Componente para mostrar una fila de la tabla
 * @param {{ id: string, row: Array, onChange: () => void, onDelete: () => void }} props Propiedades del componente
 */
const RowField = ({ id, row, onChange, onDelete }) => {
    return (
        <React.Fragment>
            <RowContainer>
                {row.map((cell, index) => (
                    <CellField
                        key={`${id}-${index}`}
                        id={`${id}-${index}`}
                        {...cell}
                        onChange={(data) => onChange(id, index, data)}
                        onDelete={(type) => onDelete(index, type)}
                    />
                ))}
            </RowContainer>
        </React.Fragment>
    );
};

RowField.propTypes = {
    id: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
    row: PropTypes.array,
    onChange: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

RowField.defaultProps = {
    row: []
};

// Estilos de la Tabla
const useTableFieldStyles = makeStyles((theme) => ({
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    drag: {
        '&:hover': {
            cursor: 'grab'
        }
    },
    option: {
        color: theme.palette.primary.main
    },
    error: {
        color: red[500]
    },
    dragging: {
        backgroundColor: '#eee',
        // z-index: 5,
        boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)'
    }
}));

/**
 * @description Componente para mostrar el campo de las tablas
 * @param {String} id
 * @param {any} value
 * @param {func:() => void} onChange
 * @param {func:() => void} onDelete
 * Consulte los elementos utilizados en {@link https://material-ui.com/ | Material-ui}
 * consulte los elementos DragPreviewImage, useDrag en {@link https://react-dnd.github.io/react-dnd/docs/overview | React DnD Drag and Drop for React}
 */
const TableField = ({ id, value, onChange, onDelete }) => {
    const classes = useTableFieldStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [{ isDragging }, drag, preview] = useDrag({
        item: { type: 'ITEM', id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    });

    /**
     * Método para la apertura del popover de las opciones
     * @param {Event} event Evento de click del objeto
     */
    const handleClick = (event) => {
        console.log('CLICK');
        setAnchorEl(event.currentTarget);
    };

    // Método de cerrado de la lista de elementos
    const handleClose = () => {
        setAnchorEl(null);
    };

    const openOptions = Boolean(anchorEl);

    /**
     * Método para eliminar fila o columnas
     * @param {"column" | "row"} type Elemento a eliminar
     * @param {number} column Columna del evento
     * @param {number} row Fila del elemento
     */
    const handleDelete = (type, column, row) => {
        // eslint-disable-next-line
        if (!confirm(`Esta seguro que desea borrar ${type === 'row' ? 'fila' : 'columna'}, esta acción es irreversible.`)) {
            return;
        }
        if (type === 'row') {
            const array = Object.values(value).filter((_, index) => index !== row);
            let object = {};
            array.forEach((a, index) => {
                object = {
                    ...object,
                    [index]: [...a]
                };
            });

            onChange({ value: { ...object } });
        } else {
            const array = Object.values(value).map((row) =>
                [...row].filter((_, index) => index !== column)
            );
            let object = {};
            array.forEach((a, index) => {
                object = {
                    ...object,
                    [index]: [...a]
                };
            });

            onChange({ value: { ...object } });
        }
    };

    // Método para crear una fila
    const handleCreateRow = () => {
        const size = Object.values(value).length;
        const object = {
            ...value,
            [size]: [...value[size - 1]].map((cell) => ({ ...cell, content: '' }))
        };

        onChange({ value: { ...object } });
    };

    // Método para crear una columna
    const handleCreateColumn = () => {
        let object = {};
        const array = Object.values(value);
        array.forEach((a, index) => {
            object = { ...object, [index]: [...a, { ...a[a.length - 1], content: '' }] };
        });

        onChange({ value: { ...object } });
    };

    /**
     * Método de cambio del contenido de la tabla
     * @param {number} row Fila a la cual pertenece el cambio
     * @param {number} cell Numero de celda a cambiar el contenido
     * @param {*} data Información del cambio
     */
    const handleChange = (row, cell, data) => {
        console.log('handleChange: click');
        const table = { ...value };
        const _row = table[row].map((_cell, index) =>
            index === cell ? { ..._cell, ...data } : _cell
        );
        onChange({ value: { ...table, [row]: _row } });
    };

    return (
        <React.Fragment>
            <DragPreviewImage connect={preview} src="/static/img/DragPreview.png" />
            <Box
                padding={3}
                marginBottom={1}
                id={`table-field-${id}`}
                ref={drag}
                className={clsx({
                    [classes.dragging]: isDragging
                })}>
                <Paper variant="outlined" square>
                    <Toolbar variant="dense" className={classes.toolbar}>
                        <Tooltip title="Mover">
                            <IconButton className={classes.drag} color="primary" size="small">
                                <DragHandle fontSize="small" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Opciones">
                            <IconButton color="primary" size="small" onClick={handleClick}>
                                <MoreHoriz fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </Toolbar>
                    <Divider />
                    <TableContainer>
                        <Table>
                            <TableBody>
                                {Object.values(value).map((row, key) => (
                                    <RowField
                                        key={key}
                                        id={key}
                                        row={row}
                                        onChange={handleChange}
                                        onDelete={(column, type) => handleDelete(type, column, key)}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Box>
            {openOptions && (
                <Popover
                    id={`popover-${id}`}
                    open={openOptions}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left'
                    }}>
                    <List dense>
                        <ListItem button onClick={handleCreateRow} className={classes.option}>
                            <ListItemIcon>
                                <KeyboardArrowDown color="primary" />
                            </ListItemIcon>
                            <ListItemText primary="Añadir Fila" />
                        </ListItem>
                        <ListItem button onClick={handleCreateColumn} className={classes.option}>
                            <ListItemIcon>
                                <KeyboardArrowRight color="primary" />
                            </ListItemIcon>
                            <ListItemText primary="Añadir Columna" />
                        </ListItem>
                        <ListItem button onClick={() => onDelete(id)} className={classes.error}>
                            <ListItemIcon>
                                <Close color="error" />
                            </ListItemIcon>
                            <ListItemText primary="Eliminar tabla" />
                        </ListItem>
                    </List>
                </Popover>
            )}
        </React.Fragment>
    );
};

TableField.propTypes = {
    id: PropTypes.string.isRequired,
    value: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default TableField;
