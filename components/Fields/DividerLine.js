import React from 'react';
import PropTypes from 'prop-types';
import { Divider, Tooltip } from '@material-ui/core';
import styled from '@emotion/styled';
import { DragPreviewImage, useDrag, } from 'react-dnd';
import { DragHandle } from '@material-ui/icons';
import { grey } from '@material-ui/core/colors';

// Componente con estilos para obtener un divider con color
const ColorDivider = styled.div`
    min-height: 8px;
    padding: 2px 0px;
    margin-bottom: 8px;
    transition: 0.5s ease;
    display: grid;
    grid-template-columns: 0px auto;
    align-items: center;

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

    :hover {
        padding: 8px 0px;
        cursor: pointer;
        background-color: rgb(245, 245, 245);
        grid-template-columns: 30px auto;
    }

    :hover .MuiDivider-root {
        background-color: var(--primary);
    }
`;

/**
 * @description Componente del divisor para los documentos
 * @param {String} id
 * @param {Boolean} child
 * @param {func: () => void } onDelete
 * Consulte los elementos utilizados en {@link https://material-ui.com/ | Material-ui}
 * consulte los elementos DragPreviewImage, useDrag en {@link https://react-dnd.github.io/react-dnd/docs/overview | React DnD Drag and Drop for React}
 */
const DividerLine = ({ id, child, onDelete }) => {
    const [{ isDragging }, drag, preview] = useDrag({
        item: { type: child ? 'CHILD' : 'ITEM', id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    });

    if (isDragging) return null;

    return (
        <React.Fragment>
            <DragPreviewImage connect={preview} src="/static/img/DragPreview.png" />
            <Tooltip title="Click para Eliminar">
                <ColorDivider ref={drag} id={id} onClick={() => onDelete(id)}>
                    <span className="dragger">
                        <DragHandle fontSize="small" style={{ fill: grey[500] }} />
                    </span>
                    <Divider variant="middle" />
                </ColorDivider>
            </Tooltip>
        </React.Fragment>
    );
};

DividerLine.propTypes = {
    id: PropTypes.string.isRequired,
    child: PropTypes.bool,
    onDelete: PropTypes.func.isRequired
};

DividerLine.defaultProps = {
    child: false
};

export default DividerLine;
