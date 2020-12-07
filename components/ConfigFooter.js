/* eslint-disable indent */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Box, Typography, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Grid, Container, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles'
import { UploadFile } from '../constants/files'
import shortid from 'shortid'
import Spinner from './Spinner'
import ImageInput from './ImageInput'
import PageTitle from './PageTitle'
import { Facebook, Instagram, Room, Save, Twitter } from '@material-ui/icons'

// Estilos del componente.
const useStyles = makeStyles({
    containerDialogTitle: {
        paddingBottom: '0px',
        textAlign: 'center'
    },
    containerDialogContent: {
        paddingTop: '0px',
        paddingBottom: '0px'
    },
    image: {
        width: '100%',
        maxHeight: '30rem',
        objectFit: 'cover'
    }
});

/**
 * @description Componente: permite obtener la información diligenciada del footer.
 * @param {Object} inforFooter Contiene la información del componente.
 * @param {func: () => void} onSubmit Función permite obtener todos los datos diligenciados en el formulario.
 * Consulte los elementos utilizados en {@link https://material-ui.com/ | Material-ui}
 *  
 */
const ConfigFooter = ({ inforFooter, onSubmit }) => {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({
        direction: '',
        logo: '',
        aboutus: '',
        urlFacebook: '',
        urlInstagram: '',
        urlTwitter: ''

    })

    const classes = useStyles()
    const handleSubmit = (event) => {
        event.preventDefault()
        onSubmit(data)
        setOpen(false)
    }
    const handleChange = event => {
        const { name, value } = event.target
        setData({ ...data, [name]: value })
    }
    const handleUploadImage = (file) => {
        setLoading(true)
        UploadFile(file, '/logo/assets', shortid.generate()).then(({ url }) => {
            setData({ ...data, logo: url })
            setLoading(false)
        })
    }
    useEffect(() => {
        setData(inforFooter)
    }, [inforFooter])
    return (
        <Box padding={2} paddingBottom={3}>
            <PageTitle
                title="Información del footer y cambiar logo"
                subtitle="En esta parte podes editar la información del footer y cambiar el logo de la plataforma"
                actions={
                    <Button
                        fullWidth
                        color="primary"
                        variant="outlined"
                        size="small"
                        onClick={() => setOpen(true)}
                    >
                        EDITAR INFORMACIÓN
                     </Button>
                }
            />

            <Grid container spacing={3} >
                <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                    <Container>

                        <Box component="div">
                            <List subheader={
                                <ListSubheader component="div" id="nested-list-subheader">
                                    Medios de Contactos
                                </ListSubheader>
                            } >
                                <ListItem>
                                    <ListItemIcon>
                                        <Room htmlColor="red" />
                                    </ListItemIcon>
                                    <ListItemText primary={`${data.direction}`} />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <Facebook htmlColor="blue" />
                                    </ListItemIcon>
                                    <ListItemText primary={`${data.urlFacebook}`} />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <Instagram htmlColor="#833AB4" />
                                    </ListItemIcon>
                                    <ListItemText primary={`${data.urlInstagram}`} />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <Twitter htmlColor="#199ec1" />
                                    </ListItemIcon>
                                    <ListItemText primary={`${data.urlTwitter}`} />
                                </ListItem>

                            </List>

                        </Box>

                    </Container>
                </Grid>
                <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                    <Container>
                        <Typography component="h6" align="inherit" color="textSecondary">Acerca de Nosotros</Typography>
                        <Typography component="p" variant="body2" align="justify">{data.aboutus}</Typography>
                    </Container>
                </Grid>
                <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                    <Box display="flex" textAlign="center">
                        <Grid container direction="column" alignContent="center" alignItems="center" justify="center">
                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                <Typography component="h6" align="center" color="textSecondary">Logo de la App</Typography>
                                <img className={classes.image} src={data.logo} />

                            </Grid>

                        </Grid>

                    </Box>
                </Grid>
            </Grid>
            <Dialog
                fullWidth={true}
                maxWidth="sm"
                open={open}
                onClose={() => setOpen(false)}
            >
                <DialogTitle className={classes.containerDialogTitle}>Información del Footer</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent className={classes.containerDialogContent}>
                        <Box marginTop={1}>
                            <TextField
                                fullWidth
                                label="Dirección de residencia"
                                type="text"
                                name="direction"
                                variant="outlined"
                                onChange={handleChange}
                                margin="dense"
                                value={data.direction}
                            />
                            <TextField
                                fullWidth
                                placeholder="Url de Facebook para redireccionar al usuario"
                                label="url de Facebook"
                                inputMode="url"
                                name="urlFacebook"
                                variant="outlined"
                                onChange={handleChange}
                                margin="dense"
                                value={data.urlFacebook}
                            />
                            <TextField
                                fullWidth
                                label="url de Instagram"
                                inputMode="url"
                                placeholder="Url de Instagram para redireccionar al usuario"
                                name="urlInstagram"
                                variant="outlined"
                                onChange={handleChange}
                                margin="dense"
                                value={data.urlInstagram}
                            />
                            <TextField
                                style={{ paddingBottom: '.5rem' }}
                                fullWidth
                                label="url de Twitter"
                                inputMode="url"
                                placeholder="Url de Twitter para redireccionar al usuario"
                                name="urlTwitter"
                                variant="outlined"
                                onChange={handleChange}
                                margin="dense"
                                value={data.urlTwitter}
                            />
                            {loading ? <Spinner /> : <ImageInput value={data.logo} label="SUBIR LOGO DE LA APP" onChange={handleUploadImage} />}
                            <TextField
                                fullWidth
                                label="Acerca deNosotros"
                                type="text"
                                placeholder="Escribe una breve descripción"
                                name="aboutus"
                                value={data.aboutus}
                                onChange={handleChange}
                                multiline
                                rows={3}
                                variant="outlined"
                                margin="dense"

                            />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            endIcon={<Save color="primary" />}
                            color="primary"
                            variant="outlined"
                            size="small"
                            type="submit"
                        >
                            Guardar Cambios
                       </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Box >
    )
}
ConfigFooter.propTypes = {
    inforFooter: PropTypes.object,
    onSubmit: PropTypes.func
}

ConfigFooter.propTypesDefault = {
    onSubmit: (data) => console.log(data)
}
export default ConfigFooter
