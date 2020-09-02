import styled from '@emotion/styled';
import {
    Box,
    Collapse,
    Grid,
    IconButton,
    InputAdornment,
    InputBase,
    Popover,
    Tooltip
} from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import { DeleteForever, DragHandle, Http, Send } from '@material-ui/icons';
import { grey } from '@material-ui/core/colors';
import { DragPreviewImage, useDrag } from 'react-dnd';
import AlertContext from '../../contexts/alert';

// Componente contenedor del IFrame
const IFrameContainer = styled.div`
    width: 100%;
    padding: 16px;
    transition: background-color 0.5s ease, z-index 0.5s ease, box-shadow 0.5s ease;
    display: grid;
    grid-template-columns: 0px auto;

    :focus-within {
        background-color: #eee;
        z-index: 5;
        -webkit-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
        -moz-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
        box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
        grid-template-columns: 0px auto;
        transition: 0.5s;
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

    .iframe-ref {
        padding: 4px;
        border: 1px solid var(--primary);
        transition: border 0.5s ease;
    }

    .iframe-ref[data-ref=''] {
        border: 1px dashed var(--primary);
    }

    iframe {
        width: 100%;
        height: 25rem;
        transition: height 0.5s ease;
    }

    iframe[src=''] {
        display: none;
        height: 0rem;
    }
`;

/**
 * Método para validar el link de powerbi
 * @param {String} link Link a revisar
 */
const validateLink = (link) => link.includes('https://app.powerbi.com/');

/**
 * Componente para visualizar un IFrame de PowerBI
 * @param {{ id: string, value: string, onChange: () => void, onDelete: () => void }} props Propiedades del componente
 */
const IFrameField = ({ id, value, onChange, onDelete }) => {
    const [ref, setRef] = React.useState(value);
    const { showMessage } = React.useContext(AlertContext);
    const [anchorEl, setAnchorEl] = React.useState(null);
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
    const handleClose = () => setAnchorEl(null);

    /**
     * Método para cambiar la referencia
     * @param {Event} event Evento del Input
     */
    const handleChange = ({ target: { value } }) => setRef(value);

    /**
     * Método para guardar la referencia introducida
     * @param {Event} event Evento de Submit
     */
    const handleSetUrl = (event) => {
        event.preventDefault();
        if (validateLink(ref)) {
            onChange({ value: ref });
        } else {
            showMessage('El vinculo ingresado no es valido');
        }
    };

    const open = Boolean(anchorEl);

    if (isDragging) return null;

    return (
        <React.Fragment>
            <DragPreviewImage connect={preview} src="/static/img/DragPreview.png" />
            <IFrameContainer ref={drag} onContextMenu={handleClick}>
                <span className="dragger">
                    <DragHandle fontSize="small" style={{ fill: grey[500] }} />
                </span>
                <div className="iframe-ref" data-ref={value} data-validate={ref}>
                    <form onSubmit={handleSetUrl}>
                        <InputBase
                            defaultValue={value}
                            value={ref}
                            name="url"
                            type="url"
                            size="small"
                            margin="dense"
                            required
                            fullWidth
                            placeholder="Introduce la dirección del documento"
                            onChange={handleChange}
                            startAdornment={
                                <InputAdornment position="start">
                                    <Http color="primary" />
                                </InputAdornment>
                            }
                            endAdornment={
                                <InputAdornment position="end">
                                    <Tooltip title="Cambiar">
                                        <IconButton size="small" type="submit">
                                            <Send color="primary" />
                                        </IconButton>
                                    </Tooltip>
                                </InputAdornment>
                            }
                        />
                    </form>
                    <Collapse in={value !== ''}>
                        <iframe id={`iframe-view-${id}`} title={`${id}`} src={value} />
                    </Collapse>
                </div>
            </IFrameContainer>
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

IFrameField.propTypes = {
    id: PropTypes.string.isRequired,
    value: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default IFrameField;
