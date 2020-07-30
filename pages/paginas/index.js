import React from 'react'
import ProjectLayout from '../../Layout/project'
import { Typography, Breadcrumbs, makeStyles, Box } from '@material-ui/core'
import { ListAltTwoTone, NavigateNext } from '@material-ui/icons'
import Link from 'next/link'
import DocumentsForm from '../../forms/DocumentsForm'
import DocumentsTable from '../../containers/DocumentsTable'
import { useRouter } from 'next/router'
import AlertContext from '../../contexts/alert'
import fb from '../../config/firebase'
import AuthContext from '../../contexts/auth'
import moment from 'moment'
// import { DOCUMENT_TEMPLATE } from '../../../constants/templates'

const useStyles = makeStyles(theme => ({
  link: {
    display: 'flex',
    textDecoration: 'none',
    color: 'inherit'
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20
  }
}))

const Page = () => {
  const router = useRouter()
  const classes = useStyles()
  const { user } = React.useContext(AuthContext)
  const [documents, setDocuments] = React.useState([])
  const { showMessage } = React.useContext(AlertContext)

  const handleDelete = _id => {
    try {
      if (window.confirm('¿ Esta seguro de querer borrar esta página ?')) {
        fb.db.collection('pages').doc(_id).delete().then(() => {
          showMessage('página borrada con éxito', 'success')
          const array = [...documents].filter(doc => doc.id !== _id)
          setDocuments(array)
        })
      }
    } catch (error) {
      showMessage(error.message, 'error')
    }
  }

  const handleCreateDocument = (temp) => {
    try {
      const date = moment().valueOf()
      const doc = {
        title: temp.title,
        fields: temp.fields,
        created: date,
        lastModified: date
      }
      fb.db.collection('pages').add(doc).then(d => {
        setDocuments([{ ...doc, id: d.id }, ...documents])
        showMessage('Página creada con éxito', 'success')
      })
    } catch (error) {
      showMessage(error.message, 'error')
    }
  }

  React.useEffect(() => {
    const getDocuments = () => {
      try {
        fb.db.collection('pages').get().then(snap => {
          const array = []
          snap.forEach(doc => {
            array.push({ ...doc.data(), id: doc.id })
          })

          setDocuments(array)
        })
      } catch (error) {
        showMessage(error.message, 'error')
      }
    }

    getDocuments()
  }, [])

  return (
    <Box padding={3}>
      <DocumentsForm onSubmit={handleCreateDocument} />
      <DocumentsTable documents={documents} onDelete={handleDelete} />
    </Box>
  )
}

export default Page