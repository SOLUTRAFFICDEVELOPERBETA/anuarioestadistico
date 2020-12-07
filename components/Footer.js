/* eslint-disable indent */
import React from 'react'
import styled from '@emotion/styled'
import Link from 'next/link'
import { Box, Container, Divider, Grid, List, ListItem, ListItemIcon, ListItemText, Typography, useTheme } from '@material-ui/core'
import { Facebook, Instagram, Room, Twitter } from '@material-ui/icons'
import ThemeContext from '../contexts/theme'
import { CutText } from '../constants'

// Estilos del componente con Emotion
const Footer = styled.footer`
        background-color:  var(--primary-light);
        background-image: url(${props => props.url});
        background-repeat: no-repeat;
        background-size: cover;
        color: #FFF;
        @media(max-width: 48em){
                background-image: none!important;
                background-color: var(--secondary-dark);
            }
`

/**
 * @description Componente: permite visualizar la información del footer.
 * Consulte los elementos utilizados en {@link https://material-ui.com/ | Material-ui}
 */
const MainFooter = () => {
    const { infoFooter: data } = React.useContext(ThemeContext)
    const theme = useTheme()

    return (
        <Footer url={'/static/img/fondofooter.png'} >
            <Box padding={2}>
                <Box paddingBottom={1}>
                    <Grid container spacing={2}>
                        <Grid item xl={6} lg={6} md={6} xs={12} sm={12}>
                            <Box bgcolor={theme.palette.primary.light}>
                                <Box padding={2}>
                                    <Typography component="h2">WISE</Typography>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xl={6} lg={6} md={6} xs={12} sm={12}>
                            <Box component="div" textAlign="right">
                                <Typography component="p">Copyright &copy; </Typography>
                                <Typography component="p">Publicaciones WISE</Typography>
                            </Box>
                        </Grid>

                    </Grid>
                </Box>

                <Divider
                    style={{ backgroundColor: theme.palette.primary.contrastText }} />
                <Grid container spacing={3}>
                    <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                        <Container>
                            <Typography
                                align="center"
                                variant="subtitle1"  >Encuentranos</Typography>
                            <Box component="div">
                                <List>
                                    <ListItem>
                                        <ListItemIcon>
                                            <Room color="error" />
                                        </ListItemIcon>
                                        <ListItemText
                                            itemID={`dir${data.direction}`}
                                            disableTypography
                                            primary={
                                                <Link href={data.direction}>
                                                    <a target="_black"
                                                        style={{ textDecoration: 'none' }}
                                                        rel="noopener noreferrer">{`${CutText(data.direction, 30)}`}</a>
                                                </Link>
                                            }
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <Facebook />
                                        </ListItemIcon>
                                        <ListItemText
                                            itemID={`url${data.urlFacebook}`}
                                            disableTypography
                                            primary={
                                                <Link href={data.urlFacebook}>
                                                    <a target="_black" style={{ textDecoration: 'none' }} rel="noopener noreferrer">Facebook</a>
                                                </Link>

                                            } />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <Instagram color="primary" />
                                        </ListItemIcon>
                                        <ListItemText
                                            itemID={`url${data.urlInstagram}`}
                                            disableTypography
                                            primary={
                                                <Link href={data.urlInstagram}>
                                                    <a target="_black" style={{ textDecoration: 'none' }} rel="noopener noreferrer">Instagram</a>
                                                </Link>

                                            } />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <Twitter color="primary" />
                                        </ListItemIcon>
                                        <ListItemText
                                            itemID={`url${data.urlTwitter}`}
                                            disableTypography
                                            primary={
                                                <Link href={data.urlTwitter}>
                                                    <a target="_black" style={{ textDecoration: 'none' }} rel="noopener noreferrer">Twitter</a>
                                                </Link>

                                            } />
                                    </ListItem>
                                </List>
                            </Box>
                        </Container>
                    </Grid>
                    <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                        <Container
                            className="acerca-nosotros"
                        >
                            <Typography
                                align="center"
                                variant="subtitle1"
                            >Acerca de nosotros</Typography>
                            <Typography variant="body2" align="justify">
                                {data.aboutus}
                            </Typography>
                        </Container>
                    </Grid>
                    <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                        <Container
                            maxWidth="xs"
                            style={{ margin: '2rem auto', display: 'flex', justifyContent: "center" }}>
                            <img alt="Logo de la app" width="50%" height="50%" src={data.logo} />
                        </Container>
                    </Grid>

                </Grid>
            </Box>
        </Footer>
    )
}

export default MainFooter
