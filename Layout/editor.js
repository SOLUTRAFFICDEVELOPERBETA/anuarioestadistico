import React from 'react'
import PropTypes from 'prop-types'
import {
  CssBaseline,
  AppBar,
  Toolbar,
  makeStyles,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
  Typography,
  Drawer,
  Hidden,
  useTheme,
  TextField,
  InputAdornment,
  ListSubheader
} from '@material-ui/core'
import { useRouter } from 'next/router'
import {
  SaveTwoTone,
  // WebTwoTone,
  ExitToAppTwoTone,
  ListAltTwoTone,
  ImageTwoTone,
  Remove,
  TableChart,
  Menu,
  TextFieldsTwoTone,
  ViewCompactTwoTone,
  InsertChartTwoTone,
  InsertLink
} from '@material-ui/icons'
import EditorContext from '../contexts/editor'
import { PARAGRAPH, LIST, IMAGE, DIVIDER, TABLE, SECTION, CHART, IFRAME, CARD } from '../constants/documents'
import AlertContext from '../contexts/alert'
// import { useForm } from 'react-hook-form'

const drawerWidth = 360

const useLayoutStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerContainer: {
    overflow: 'auto',
    height: '100%',
    display: 'contents'
  },
  drawerMenu: {
    backgroundColor: theme.palette.background.paper,
    overflowY: 'auto',
    overflowX: 'hidden',
    flexGrow: 2
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    width: '100%',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      maxWidth: `calc(100% - ${drawerWidth}px)`
    }
  },
  titleForm: {
    padding: theme.spacing(2)
  }
}))

// Estilos del componente
/*
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  options: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    flexGrow: 1,

    [theme.breakpoints.down('md')]: {
      justifyContent: 'flex-end'
    }
  },
  main: {
    flexGrow: 1,
    width: '100%'
  }
}))
*/

// Capa de edición de los documentos
const EditorLayout = ({ children, onSave, onChangeTitle }) => {
  const classes = useLayoutStyles()
  const theme = useTheme()
  const router = useRouter()
  const { showMessage } = React.useContext(AlertContext)
  const { onCreateFile, title } = React.useContext(EditorContext)
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [$title, setTitle] = React.useState(title)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleChangeTitle = event => {
    event.preventDefault()
    // console.log({ $title })
    onChangeTitle($title)
    showMessage('Nombre del documento cambiado', 'success')
  }

  const drawer = (
    <React.Fragment>
      <Toolbar />
      <div className={classes.drawerContainer}>
        <form className={classes.titleForm} onSubmit={handleChangeTitle}>
          <TextField
            fullWidth
            size="small"
            margin="dense"
            // defaultValue={title}
            placeholder="Ingrese un nuevo nombre"
            name="title"
            value={$title}
            onChange={event => setTitle(event.target.value)}
            label="Cambiar nombre del documento"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton type="submit">
                    <SaveTwoTone color="primary" />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </form>
        <List className={classes.drawerMenu}>
          <ListSubheader>Campos del Documento</ListSubheader>
          <ListItem button onClick={() => onCreateFile(PARAGRAPH)}>
            <ListItemIcon><TextFieldsTwoTone color="primary" /></ListItemIcon>
            <ListItemText primary="Campo de Texto" />
          </ListItem>
          <ListItem button onClick={() => onCreateFile(DIVIDER)}>
            <ListItemIcon><Remove color="primary" /></ListItemIcon>
            <ListItemText primary="Divisor" />
          </ListItem>
          <ListItem button onClick={() => onCreateFile(TABLE)}>
            <ListItemIcon><TableChart color="primary" /></ListItemIcon>
            <ListItemText primary="Tabla" />
          </ListItem>
          <ListItem button onClick={() => onCreateFile(LIST)}>
            <ListItemIcon><ListAltTwoTone color="primary" /></ListItemIcon>
            <ListItemText primary="Lista" />
          </ListItem>
          <ListItem button onClick={() => onCreateFile(IMAGE)}>
            <ListItemIcon><ImageTwoTone color="primary" /></ListItemIcon>
            <ListItemText primary="Imagen" />
          </ListItem>
          <ListItem button onClick={() => onCreateFile(SECTION)}>
            <ListItemIcon><ViewCompactTwoTone color="primary" /></ListItemIcon>
            <ListItemText primary="Sección" />
          </ListItem>
          <ListItem button onClick={() => onCreateFile(CHART)}>
            <ListItemIcon><InsertChartTwoTone color="primary" /></ListItemIcon>
            <ListItemText primary="Gráfico" />
          </ListItem>
          <ListItem button onClick={() => onCreateFile(IFRAME)}>
            <ListItemIcon><InsertLink color="primary" /></ListItemIcon>
            <ListItemText primary="Referencia" />
          </ListItem>
          <ListItem button onClick={() => onCreateFile(CARD)}>
            <ListItemIcon><ViewCompactTwoTone color="primary" /></ListItemIcon>
            <ListItemText primary="Carta" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListSubheader>Opciones</ListSubheader>
          <ListItem button onClick={onSave}>
            <ListItemIcon><SaveTwoTone color="primary" /></ListItemIcon>
            <ListItemText primary="Guardar" />
          </ListItem>
          <ListItem button onClick={() => router.back()}>
            <ListItemIcon><ExitToAppTwoTone color="primary" /></ListItemIcon>
            <ListItemText primary="Salir" />
          </ListItem>
        </List>
      </div>
    </React.Fragment>
  )

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <nav>
        <Hidden mdUp implementation="css">
          <Drawer
            // container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  )
}

EditorLayout.propTypes = {
  children: PropTypes.node.isRequired,
  onSave: PropTypes.func,
  onChangeTitle: PropTypes.func
}

export default EditorLayout