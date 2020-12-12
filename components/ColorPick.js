import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
    makeStyles,
    IconButton,
    Popover,
    SvgIcon,
    Button,
    useTheme,
    Tooltip,
    InputBase,
    InputAdornment,
    Typography,
    TextField,
    ButtonBase
} from '@material-ui/core';
import { COLORS, randomHexColorCode } from '../constants/colors';
import { ColorLensTwoTone, Replay, Send } from '@material-ui/icons';
import { useForm } from 'react-hook-form';
import AlertContext from '../contexts/alert';

/**
 * Método para convertir un color a rgb
 * @param {Number} rgb Numero rgb a convertir
 */
function rgbToHex(rgb) {
    let hex = Number(rgb).toString(16);
    if (hex.length < 2) {
        hex = '0' + hex;
    }

    return hex;
}

/**
 * Método para convertir un color en Hex a RGB
 * @param {string} hex Código de color Hex
 */
const hexToRgb = hex => {
    return hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
        , (m, r, g, b) => '#' + r + r + g + g + b + b)
        .substring(1).match(/.{2}/g)
        .map(x => parseInt(x, 16))
}


// Estilos del componente
const useStyles = makeStyles((theme) => ({
    colorPalette: {
        padding: theme.spacing(1),
        display: 'grid',
        'grid-template-columns': 'repeat(6, 1fr)',
        gridColumnGap: theme.spacing(1),
        gridRowGap: theme.spacing(1)
    },
    color: {
        border: `1px solid ${theme.palette.secondary.light}`
    },
    colorBtn: {
        color: (props) => props.color
    },
    selected: {
        border: '1px solid #ccc',
        borderRadius: theme.spacing(1)
    },
    group: {
        display: 'flex',
        padding: theme.spacing(0.5, 1),
        marginBottom: theme.spacing(1),

        [theme.breakpoints.down('xs')]: {
            flexWrap: 'wrap'
        }
    },
    input: {
        flexGrow: 1
    },
    form: {
        margin: theme.spacing(1)
    }
}));

/**
 * @description Componente de selección de colores de la paleta
 * @param {String} color 
 * @param {Array []} colors 
 * @param {func: ()=> void} onChange 
 * @param {any} icon 
 * Consulte los elementos utilizados en {@link https://material-ui.com/ | Material-ui}
 */
const ColorPick = ({color, colors, onChange, icon}) => {
    const theme = useTheme();
    const classes = useStyles({color});
    const [_red, _green, _blue] = hexToRgb(color);
    const RGBForm = useForm({
        defaultValues: {
            red: _red,
            green: _green,
            blue: _blue
        }
    });
    const [hex, setHex] = React.useState(color.replace('#', ''));
    const { showMessage } = React.useContext(AlertContext);
    const [optionsAnchorEl, setOptionsAnchorEl] = React.useState(null);

    const handleRGBForm = ({ red, green, blue }) => {
        const $red = rgbToHex(red);
        const $green = rgbToHex(green);
        const $blue = rgbToHex(blue);

        onChange(`#${$red}${$green}${$blue}`);
        RGBForm.reset();
    };

    const handleHexForm = (event) => {
        event.preventDefault();
        if (/^#[0-9A-F]{6}$/i.test(`#${hex}`)) {
            onChange(`#${hex}`);
        } else {
            showMessage('Código no valido');
        }
    };

    /**
     * Método de apertura de los campos
     * @param {Event} event Evento del botón
     */
    const handleOpenOptions = (event) => {
        setOptionsAnchorEl(event.currentTarget);
    };

    // Método de cerrado de las opciones
    const handleCloseOptions = () => {
        setOptionsAnchorEl(null);
    };

    const openOptions = Boolean(optionsAnchorEl);

    React.useEffect(() => {
        setHex(color.replace('#', ''));
        const [red, green, blue] = hexToRgb(color);
        RGBForm.setValue('red', red);
        RGBForm.setValue('green', green);
        RGBForm.setValue('blue', blue);
    }, [color]);

    return (
        <React.Fragment>
            <Button className={classes.colorBtn} size="small" onClick={handleOpenOptions}>
                <SvgIcon color={openOptions ? 'primary' : 'inherit'} component={icon} />
            </Button>
            {openOptions && (
                <Popover
                    open={openOptions}
                    anchorEl={optionsAnchorEl}
                    onClose={handleCloseOptions}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left'
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left'
                    }}>
                    <form className={classes.form} onSubmit={handleHexForm}>
                        <TextField
                            label="Código Hexadecimal"
                            name="hex"
                            type="text"
                            required
                            fullWidth
                            variant="outlined"
                            placeholder={color.replace('#', '')}
                            value={hex}
                            onChange={(event) => setHex(event.target.value)}
                            margin="dense"
                            InputProps={{
                                startAdornment: <InputAdornment position="start">#</InputAdornment>,
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton size="small" type="submit" color="primary">
                                            <Send />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </form>
                    <form className={classes.form} onSubmit={RGBForm.handleSubmit(handleRGBForm)}>
                        <Typography variant="caption" color="primary" gutterBottom>
                            RGB
                        </Typography>
                        <div className={classes.group}>
                            <InputBase
                                type="number"
                                name="red"
                                required
                                defaultValue={_red}
                                inputRef={RGBForm.register({ required: true })}
                                inputProps={{ min: 0, max: 255 }}
                                className={classes.input}
                                startAdornment={<InputAdornment position="start">R</InputAdornment>}
                            />
                            <InputBase
                                type="number"
                                name="green"
                                required
                                defaultValue={_green}
                                inputRef={RGBForm.register({ required: true })}
                                inputProps={{ min: 0, max: 255 }}
                                className={classes.input}
                                startAdornment={<InputAdornment position="start">G</InputAdornment>}
                            />
                            <InputBase
                                type="number"
                                name="blue"
                                required
                                defaultValue={_blue}
                                inputRef={RGBForm.register({ required: true })}
                                inputProps={{ min: 0, max: 255 }}
                                className={classes.input}
                                startAdornment={<InputAdornment position="start">B</InputAdornment>}
                            />
                            <IconButton size="small" type="submit" color="primary">
                                <Send />
                            </IconButton>
                        </div>
                    </form>
                    <div className={classes.colorPalette}>
                        {colors.map((rgb, index) => {
                            const isSelected = color === rgb;

                            return (
                                <ButtonBase
                                    key={index}
                                    size="small"
                                    disabled={isSelected}
                                    className={clsx({
                                        [classes.selected]: isSelected
                                    })}
                                    onClick={() => onChange(rgb)}>
                                    <SvgIcon>
                                        <svg height="24" width="24">
                                            <circle
                                                fill={
                                                    isSelected
                                                        ? theme.palette.augmentColor({ main: rgb })
                                                            .dark
                                                        : rgb
                                                }
                                                cx="12"
                                                cy="12"
                                                r="10"
                                            />
                                        </svg>
                                    </SvgIcon>
                                </ButtonBase>
                            );
                        })}
                        <Tooltip title="Aleatorio">
                            <ButtonBase
                                size="small"
                                color="primary"
                                onClick={() => onChange(randomHexColorCode())}>
                                <Replay />
                            </ButtonBase>
                        </Tooltip>
                    </div>
                </Popover>
            )}
        </React.Fragment>
    );
};

ColorPick.propTypes = {
    color: PropTypes.string,
    colors: PropTypes.array,
    onChange: PropTypes.func,
    icon: PropTypes.any
};

ColorPick.defaultProps = {
    color: '#000000',
    colors: COLORS,
    icon: ColorLensTwoTone
};

export default ColorPick;
