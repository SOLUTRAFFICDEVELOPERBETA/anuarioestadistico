/* eslint-disable indent */
import React from 'react'
import { Button, List, makeStyles, Grid, CircularProgress, Box, Container } from '@material-ui/core'
import { SaveTwoTone } from '@material-ui/icons'
import ColorPicker from '../../containers/picker'
import Subtitle from '../../components/Subtitle'
import ThemeContext from '../../contexts/theme'
import { UploadFile } from '../../constants/files'
import withAuth from '../../HOC/withAuth'
import { THEMES } from '../../constants/options'
import PageTitle from '../../components/PageTitle'
import ThemeSelector from '../../containers/themes'
import ConfigFooter from '../../components/ConfigFooter'

const config = {
    bg: {
        name: '',
        url: '',
        path: ''
    },
    palette: {
        primary: '#0d283d',
        secondary: '#0c447c',
        error: '#d50000',
        warning: '#ff9800',
        info: '#01579b',
        success: '#2e7d32'
    },
    themes: [],
    infoFooter: {
        direction: '',
        logo: '',
        urlFacebook: '',
        urlInstagram: '',
        urlTwitter: '',
        aboutus: ''
    }
}

const useStyles = makeStyles(theme => ({
    image: {
        width: '100%',
        maxHeight: '30rem',
        objectFit: 'cover'
    }
}))
const ConfigPage = () => {
    const classes = useStyles()
    const [data, setData] = React.useState(config)
    const [uploading, setUploading] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [progress, setProgress] = React.useState(0)
    const { palette, bg, themes, infoFooter, EditPalette, SaveChange } = React.useContext(ThemeContext)



    /**
   * Función para cambiar el color de la paleta
   * @param {string} color Color a cambiar
   */
    const handleChangeThemeColor = color => item => {
        const p = { ...palette, [color]: item }
        const updatedThemes = data.themes.map(theme => {
            if (theme.name.trim() === 'Usuario') {
                return ({ ...theme, palette: p })
            } else {
                return theme
            }
        })
        setData((d) => ({ ...d, palette: p, themes: updatedThemes }))
        EditPalette(p);
    };



    const handleChangeTheme = colors => {
        setData({ ...data, palette: { ...palette, ...colors } })
        EditPalette({ ...palette, ...colors })
    };

    /**
     *  Función que permite carga la imagen de login de la app.
     * @param {Object} files Object{}  
     */
    const handleUploadImage = (files) => {
        const [file] = files
        setProgress(0)
        setUploading(true)
        UploadFile(file, '/assets', 'background', (pro) => {
            setProgress(pro)
        }).then(url => {
            setUploading(false)
            setData({ ...data, bg: url })
        })
    }

    const handleSaveChanges = () => {
        const { error, info, primary, secondary, success, warning } = data.palette
        SaveChange({
            bg: data.bg,
            palette: {
                primary,
                secondary,
                success,
                warning,
                info,
                error
            },
            themes: THEMES,
            infoFooter: data.infoFooter
        })
    }

    React.useEffect(() => {
        if (loading) {
            setData({ ...data, palette, bg, themes, infoFooter });
            setLoading(false);

        }
        // eslint-disable-next-line
    }, [palette, bg, themes, infoFooter]);
    return (
        <Container maxWidth="lg">
            <PageTitle primary="Configuración" secondary="Configuración de los parámetros de la aplicación">
                <Button
                    fullWidth
                    size="small"
                    color="primary"
                    variant="outlined"
                    endIcon={<SaveTwoTone />}
                    onClick={handleSaveChanges}
                >
                    guardar
        </Button>
            </PageTitle>
            <Subtitle primary="Fondo de pantalla" secondary="Elige el fondo de pantalla de la aplicación" />
            <Box display="flex" textAlign="center">
                <Grid container direction="row" alignContent="center" alignItems="center" justify="center">
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        {uploading ? (
                            <CircularProgress
                                variant="determinate"
                                color="primary"
                                value={progress}
                                size={150}
                                thickness={5}
                            />
                        ) : (
                                <label htmlFor="background">
                                    <img className={classes.image} src={data.bg && data.bg.url ? data.bg.url : '/static/img/not_found.jpg'} alt="Fondo de Pantalla" />
                                </label>
                            )}
                    </Grid>
                </Grid>
            </Box>
            <input
                type="file"
                id="background"
                name="background"
                multiple={false}
                accept="image/*"
                style={{
                    display: 'none'
                }}
                onChange={({ target: { files } }) => handleUploadImage(files)}
            />

            <Subtitle
                primary="Temas de la plataforma"
                secondary="Elige el tema para plataforma" />
            <ThemeSelector onSelect={handleChangeTheme} themes={THEMES} />
            <Subtitle
                primary="Paleta de colores"
                secondary="Elige los colores para el tema de la aplicación" />
            <List dense>
                <ColorPicker color="principal" palette={data.palette.primary} onChange={handleChangeThemeColor('primary')} />
                <ColorPicker color="secundario" palette={data.palette.secondary} onChange={handleChangeThemeColor('secondary')} />
                <ColorPicker color="error" palette={data.palette.error} onChange={handleChangeThemeColor('error')} />
                <ColorPicker color="advertencia" palette={data.palette.warning} onChange={handleChangeThemeColor('warning')} />
                <ColorPicker color="información" palette={data.palette.info} onChange={handleChangeThemeColor('info')} />
                <ColorPicker color="éxito" palette={data.palette.success} onChange={handleChangeThemeColor('success')} />
            </List>

            <ConfigFooter
                inforFooter={data.infoFooter}
                onSubmit={(infoFooter) => setData({ ...data, infoFooter })}
            />
        </Container>
    )
}

export default withAuth(ConfigPage);
