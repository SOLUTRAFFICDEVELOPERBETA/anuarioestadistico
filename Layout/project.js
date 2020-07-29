import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import {
  AppBar,
  Toolbar,
  Button,
  makeStyles,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Tooltip
} from '@material-ui/core'
import AvatarIcon from '../components/AvatarIcon'
import {
  ChevronLeft,
  ListAltTwoTone,
  ChevronRight,
  VerticalSplitTwoTone,
  DescriptionTwoTone,
  DashboardTwoTone
} from '@material-ui/icons'
import { useRouter } from 'next/router'
// import ConfigMenu from './config'

const DRAWER_WIDTH = 240

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  logo: {
    flexGrow: 1
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawer: {
    width: DRAWER_WIDTH,
    flexShrink: 0,
    whiteSpace: 'nowrap'
  },
  drawerOpen: {
    width: DRAWER_WIDTH,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1
    }
  },
  drawerPaper: {
    width: DRAWER_WIDTH
  },
  drawerContainer: {
    overflowY: 'auto',
    overflowX: 'hidden',
    flexGrow: 2
  },
  content: {
    height: '100vh',
    flexGrow: 1,
    padding: theme.spacing(1, 2)
  },
  sidebar: {
    height: '100%',
    display: 'contents',
    padding: theme.spacing(1)
  }
}))

const ProjectLayout = ({ children }) => {
  const classes = useStyles()
  const router = useRouter()
  const [open, setOpen] = React.useState(false)

  const { query: { id } } = router

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar variant="dense">
          <div className={classes.logo}>
            <Button color="inherit">
              wise
            </Button>
          </div>
          <AvatarIcon />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}
      >
        <Toolbar variant="dense" />
        <div className={classes.sidebar}>
          <div>
            <List dense>
              <ListItem button onClick={() => setOpen(!open)}>
                <ListItemIcon>
                  <Tooltip title={open ? 'Encoger' : 'Expandir'} placement="right">
                    {open ? <ChevronLeft /> : <ChevronRight />}
                  </Tooltip>
                </ListItemIcon>
              </ListItem>
            </List>
          </div>
          <Divider />
          <div className={classes.drawerContainer}>
            <List dense>
              <ListItem button onClick={() => router.push('/projects/[id]/board', `/projects/${id}/board`)}>
                <ListItemIcon>
                  <Tooltip title="Tableros" placement="right">
                    <VerticalSplitTwoTone />
                  </Tooltip>
                </ListItemIcon>
                <ListItemText primary="Tableros" />
              </ListItem>
              <ListItem button onClick={() => router.push('/projects/[id]/documents', `/projects/${id}/documents`)}>
                <ListItemIcon>
                  <Tooltip title="Documentos" placement="right">
                    <DescriptionTwoTone />
                  </Tooltip>
                </ListItemIcon>
                <ListItemText primary="Documentos" />
              </ListItem>
              <ListItem button onClick={() => router.push('/projects/[id]/canvas', `/projects/${id}/canvas`)}>
                <ListItemIcon>
                  <Tooltip title="Canvas" placement="right">
                    <DashboardTwoTone />
                  </Tooltip>
                </ListItemIcon>
                <ListItemText primary="Canvas" />
              </ListItem>
            </List>
          </div>
          <Divider />
          <div>
            <List dense>
              {/* <ConfigMenu expand={open} /> */}
              <ListItem button onClick={() => router.push('/projects')}>
                <ListItemIcon>
                  <Tooltip title="Volver a proyectos" placement="right">
                    <ListAltTwoTone />
                  </Tooltip>
                </ListItemIcon>
                <ListItemText primary="Proyectos" />
              </ListItem>
            </List>
          </div>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar variant="dense" />
        {children}
      </main>
    </div>
  )
}

ProjectLayout.propTypes = {
  children: PropTypes.node
}

export default ProjectLayout
