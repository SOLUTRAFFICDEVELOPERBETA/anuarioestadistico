import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import {
    Box,
    Grid,
    IconButton,
    makeStyles,
    MenuItem,
    Popover,
    TextField,
    Tooltip
} from '@material-ui/core';
import { DeleteForever, DragHandle } from '@material-ui/icons';
import { useRouter } from 'next/router';
import React from 'react';
import { UploadFile } from '../../constants/files';
import AlertContext from '../../contexts/alert';
import { DragPreviewImage, useDrag } from 'react-dnd';
import clsx from 'clsx';
import { grey } from '@material-ui/core/colors';
import { GRID_SIZES } from '../../constants/documents';
// import EditorContext from '../../contexts/editor'

// Campo de la imagen
const ImageContainer = styled.div`
    display: grid;
    padding: 16px;
    grid-template-columns: 0px auto;
    align-items: center;

    img {
        max-width: 100%;
    }

    input {
        display: none;
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

    .dragger:hover {
        cursor: move;
    }

    :hover .dragger {
        visibility: visible;
        opacity: 1;
    }

    :hover {
        grid-template-columns: 30px auto;
    }

    .image {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .img-name {
        background-color: rgba(0, 0, 0, 0.5);
        color: white;
        padding: 8px;
        position: absolute;
        width: 100%;
        text-align: center;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 5;
        height: 0px;
        visibility: hidden;
        opacity: 0;
        transition: visibility 0s, opacity 0.5s linear, height 0.5s ease;
    }

    .image:hover .img-name {
        height: auto;
        visibility: visible;
        opacity: 1;
    }

    .image:hover {
        cursor: pointer;
    }

    .image:hover::after {
        content: '';
        background-color: rgba(0, 0, 0, 0.25);
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        position: absolute;
    }

    .img {
        transition: width 0.5s ease, height 0.5s ease;
    }

    /*display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;


  span {
  }

  :hover span {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .iconButton {
    cursor: pointer;
  }

  :hover .img-container {
    cursor: pointer;
  }
  
  :hover .img-container::after {
    content: "";
    background-color: rgba(0, 0, 0, 0.25);
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
  }*/
`;

// Estilos del componente
const useStyles = makeStyles((theme) => ({
    dragging: {
        backgroundColor: '#eee',
        // z-index: 5,
        boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)'
    }
}));

/**
 * Componente para mostrar una imagen en el documento
 * @param {{ id: string, value: any, size: number | string, child: boolean, disableGrid: boolean, onChange: () => void, onDelete: () => void }} props Propiedades del componete
 */
const ImageField = ({ id, value, size, child, disableGrid, onChange, onDelete }) => {
    const classes = useStyles();
    const { query } = useRouter();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { showMessage } = React.useContext(AlertContext);
    const [{ isDragging }, drag, preview] = useDrag({
        item: { type: child ? 'CHILD' : 'ITEM', id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    });
    // const { onChangeField, onDeleteField } = React.useContext(EditorContext)

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
     * Método para actualizar la imagen
     * @param {FileList} files Archivos a subir
     */
    const handleUpdateFile = (files) => {
        try {
            const [file] = files;
            UploadFile(file, `/anuario/assets${query.id}`, file.name).then((url) => {
                onChange({ value: url });
            });
        } catch (error) {
            showMessage(error.message, 'error');
        }
    };

    const open = Boolean(anchorEl);

    return (
        <React.Fragment>
            <DragPreviewImage connect={preview} src="/static/img/DragPreview.png" />
            <Box
                onContextMenu={handleClick}
                ref={drag}
                className={clsx({
                    [classes.dragging]: isDragging
                })}>
                <ImageContainer>
                    <span className="dragger">
                        <DragHandle fontSize="small" style={{ fill: grey[500] }} />
                    </span>
                    <label htmlFor={id}>
                        <div className="image">
                            <img src={value.url} alt="imagen" />
                            <span className="img-name">{value.name}</span>
                        </div>
                    </label>
                    <input
                        id={id}
                        type="file"
                        name={id}
                        multiple={false}
                        // style={{ display: 'none' }}
                        onChange={(e) => handleUpdateFile(e.target.files)}
                    />
                </ImageContainer>
            </Box>
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
                                    disabled={disableGrid}
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

ImageField.propTypes = {
    id: PropTypes.string.isRequired,
    value: PropTypes.object,
    size: PropTypes.any,
    child: PropTypes.bool,
    disableGrid: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

ImageField.defaultProps = {
    child: false,
    disableGrid: false
};

export default ImageField;
