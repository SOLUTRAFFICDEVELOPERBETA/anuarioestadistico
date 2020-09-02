import React from 'react';
import PropTypes from 'prop-types';
import {
    TITLE,
    PARAGRAPH,
    QUOTES,
    DIVIDER,
    LIST,
    IMAGE,
    TABLE,
    SUBTITLE,
    SECTION,
    CHART,
    IFRAME,
    CUSTOM_TEXT
} from '../../constants/documents';
import { Grid, makeStyles } from '@material-ui/core';
import ListField from './ListField';
import EditorContext from '../../contexts/editor';
import TableField from './TableField';
import TextInput from './TextInput';
import ImageField from './ImageField';
import SectionField from './SectionField';
import clsx from 'clsx';
import { useDrop } from 'react-dnd';
import DividerLine from './DividerLine';
import ChartField from './ChartField';
import IFrameField from './IFrameField';

const usePlacementStyles = makeStyles((theme) => ({
    root: {
        height: theme.spacing(0.5),
        transition: theme.transitions.create(['height', 'backgroundColor'], {
            duration: theme.transitions.duration.complex
        })
    },
    over: {
        height: theme.spacing(1),
        backgroundColor: theme.palette.primary.light
    }
}));

/**
 * Componente para recibir el evento de Drop para el Drag and Drop de los componente
 * @param {{ onDrop: () => void }} props Propiedades del componente
 */
const DropPlacement = ({ onDrop }) => {
    const classes = usePlacementStyles();

    const [{ isOver }, drop] = useDrop({
        accept: 'ITEM',
        drop: (item) => onDrop(item),
        collect: (mon) => ({
            isOver: !!mon.isOver()
        })
    });

    return <div className={clsx(classes.root, { [classes.over]: isOver })} ref={drop} />;
};

DropPlacement.propTypes = {
    onDrop: PropTypes.func.isRequired
};

/**
 * Componente que contiene y decide que campo renderizar dependiendo del tipo
 * @param {{ id: string, value: any, type: string, size: number | string, onDrop: () => void }} props Propiedades del componente
 */
const DocumentField = ({ id, value, type, size, onDrop, ...others }) => {
    const { onChangeField, onDeleteField } = React.useContext(EditorContext);

    /**
     * Método para manejar los cambios de los campo
     * @param {*} data Información a guardar
     */
    const handleChange = (data) => {
        onChangeField(id, data);
    };

    // Función para obtener el campo a mostrar a partir del tipo de campo.
    const getField = () => {
        switch (type) {
            case SUBTITLE:
            case TITLE:
            case PARAGRAPH:
            case QUOTES:
            case CUSTOM_TEXT:
                return (
                    <TextInput
                        id={id}
                        {...others}
                        value={value}
                        type={type}
                        size={size}
                        onChange={handleChange}
                        onDelete={() => onDeleteField(id)}
                    />
                );
            case SECTION:
                return (
                    <SectionField
                        id={id}
                        value={value}
                        size={size}
                        onChange={handleChange}
                        onDelete={() => onDeleteField(id)}
                    />
                );
            case DIVIDER:
                return <DividerLine id={id} onDelete={onDeleteField} />;
            case IMAGE:
                return (
                    <ImageField
                        id={id}
                        value={value}
                        size={size}
                        onChange={handleChange}
                        onDelete={() => onDeleteField(id)}
                    />
                );
            case LIST:
                return (
                    <ListField
                        id={id}
                        value={value}
                        size={size}
                        onChange={handleChange}
                        onDelete={() => onDeleteField(id)}
                    />
                );
            case TABLE:
                return (
                    <TableField
                        id={id}
                        value={value}
                        onChange={handleChange}
                        onDelete={() => onDeleteField(id)}
                    />
                );
            case CHART:
                return (
                    <ChartField
                        id={id}
                        value={value}
                        size={size}
                        onChange={handleChange}
                        onDelete={() => onDeleteField(id)}
                    />
                );
            case IFRAME:
                return (
                    <IFrameField
                        id={id}
                        value={value}
                        size={size}
                        onChange={handleChange}
                        onDelete={() => onDeleteField(id)}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <Grid xl={size} lg={size} md={size} sm={12} xs={12}>
            {getField()}
            <DropPlacement onDrop={onDrop} />
        </Grid>
    );
};

DocumentField.propTypes = {
    id: PropTypes.string,
    value: PropTypes.any,
    type: PropTypes.string,
    size: PropTypes.number,
    onDrop: PropTypes.func.isRequired
};

DocumentField.defaultProps = {
    size: 12
};

export default DocumentField;
