import React from 'react'
import PropTypes from 'prop-types'
import {
  AppBar,
  Toolbar,
  Typography,
  Tooltip,
  IconButton,
  Popover,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Dialog,
  DialogTitle,
  DialogContent
  // Grid
} from '@material-ui/core'
import { MoreVert, PostAddTwoTone } from '@material-ui/icons'
// import DocumentTemplateCard from '../components/DocumentTemplateCard'
import fb from '../config/firebase'
import useFixedList from '../hooks/useFixedList'
import SearchInput from '../components/SearchInput'
import { documents } from '../constants/templates'

const useStyles = makeStyles(theme => ({
  appbar: {
    marginY: theme.spacing(5)
  },
  toolbar: {
    display: 'flex'
  }
}))

const DocumentsForm = ({ onSubmit }) => {
  const classes = useStyles()
  const [templates, setTemplates] = React.useState([])
  const [setTemplateList, TemplatesList] = useFixedList(5)
  const [openForm, setOpenForm] = React.useState(false)
  const [optionsAnchorEl, setOptionsAnchorEl] = React.useState(null)

  const handleOpenOptions = (event) => {
    setOptionsAnchorEl(event.currentTarget)
  }

  const handleCloseOptions = () => {
    setOptionsAnchorEl(null)
  }

  const handleSubmit = (temp) => {
    setOpenForm(false)
    onSubmit(temp)
  }

  const handleSearch = ({ search }) => {
    const array = [...templates].filter(temp => temp.title.toLowerCase().includes(search.toLowerCase()))
    setTemplateList(array)
  }

  const openOptions = Boolean(optionsAnchorEl)

  React.useEffect(() => {
    const getTemplates = () => {
      fb.db.collection('TEMPLATES').get().then(snap => {
        const array = []
        snap.forEach(doc => {
          array.push({ ...doc.data(), id: doc.id })
        })

        setTemplates( documents)
      })
    }

    getTemplates()
  }, [])

  React.useEffect(() => {
    setTemplateList(templates)
  }, [templates])

  return (
    <React.Fragment>
      <AppBar position="static" color="transparent" elevation={0} className={classes.appbar}>
        <Toolbar variant="dense" className={classes.toolbar}>
          <Typography color="primary" align="left" variant="h4" style={{ flexGrow: 1 }}>
              Administración de Páginas
          </Typography>
          <Tooltip title="Opciones">
            <IconButton size="medium" color="primary" onClick={handleOpenOptions}>
              <MoreVert />
            </IconButton>
          </Tooltip>
          {openOptions && (
            <Popover
              open={openOptions}
              anchorEl={optionsAnchorEl}
              onClose={handleCloseOptions}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
            >
              <List dense>
                <ListItem button onClick={() => setOpenForm(true)}>
                  <ListItemIcon>
                    <PostAddTwoTone />
                  </ListItemIcon>
                  <ListItemText primary="Añadir Página" />
                </ListItem>
              </List>
            </Popover>
          )}
        </Toolbar>
      </AppBar>
      {openForm && (
        <Dialog
          open={openForm}
          onClose={() => setOpenForm(false)}
          scroll="paper"
          fullWidth
          maxWidth="lg"
        >
          <DialogTitle>selecciona la Página a crear</DialogTitle>
          <DialogContent>
            <SearchInput onSearch={handleSearch} />
            <TemplatesList itemRender={(item) => (
              <ListItem
                button
                divider
                onClick={() => handleSubmit(item)}
              >
                <ListItemText primary={item.title} />
              </ListItem>
            )} />
          </DialogContent>
        </Dialog>
      )}
    </React.Fragment>
  )
}

DocumentsForm.propTypes = {
  onSubmit: PropTypes.func
}

export default DocumentsForm
