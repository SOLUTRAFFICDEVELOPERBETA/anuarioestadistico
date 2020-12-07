/* eslint-disable indent */
import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles, useTheme, useMediaQuery, Box, Grid, Typography, Divider } from '@material-ui/core'

// Estilos del componente
const useStyles = makeStyles(theme => ({
  divider: {
    marginBottom: theme.spacing(1)
  }
}))
/**
 * @description Componente que permite integrar un titulo en una pagina
 * @param {String} title 
 * @param {String} subtitle 
 * @param {any} children 
 * @param {Object {}} actions 
 * @param {Boolean} disableDivider 
 * Consulte los elementos utilizados en {@link https://material-ui.com/ | Material-ui}
 */
const PageTitle = ( {title, subtitle, children, actions, disableDivider} ) => {
  const classes = useStyles()
  const theme = useTheme()
  const responsive = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <Box marginBottom={2}>
      {actions ? (
        <Grid container spacing={1} alignItems="center" justify="space-between">
          {responsive ? (
            <React.Fragment>
              <Grid item xl={9} lg={9} md={9}>
                <Typography color="primary" variant="h4">
                  {title}
                </Typography>
              </Grid>
              <Grid item xl="auto" lg="auto" md="auto">
                {actions}
              </Grid>
              <Grid item xl={12} lg={12} md={12}>
                <Typography color="secondary" variant="subtitle1">
                  {subtitle}
                </Typography>
              </Grid>
            </React.Fragment>
          ) : (
              <React.Fragment>
                <Grid item sm={12} xs={12}>
                  <Typography color="primary" variant="h4">
                    {title}
                  </Typography>
                  <Typography color="secondary" variant="subtitle1">
                    {subtitle}
                  </Typography>
                </Grid>
                <Grid item sm={12} xs={12}>
                  {actions}
                </Grid>
              </React.Fragment>
            )}
        </Grid>
      ) : (
          <React.Fragment>
            <Typography variant="h4" color="primary">
              {title}
            </Typography>
            <Typography variant="subtitle1" color="secondary">
              {subtitle}
            </Typography>
          </React.Fragment>
        )}
      {!disableDivider && <Divider variant="middle" />}
      <div className={classes.divider}></div>
      <Typography variant="body1">
        {children}
      </Typography>
    </Box>
  )
}

PageTitle.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.object,
  actions: PropTypes.node,
  disableDivider: PropTypes.bool
}

PageTitle.defaultProps = {
  title: '',
  subtitle: '',
  children: '',
  actions: null,
  disableDivider: false
}

export default PageTitle
