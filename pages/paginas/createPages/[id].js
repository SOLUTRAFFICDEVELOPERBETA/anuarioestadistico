import React from 'react'
import { useRouter } from 'next/router'
import { DOCUMENT_TEMPLATE, FIELDS } from '../../../constants/templates'
import EditorLayout from '../../../Layout/editor'
import { Box, Grid, Paper } from '@material-ui/core'
import styled from '@emotion/styled'
import EditorContext from '../../../contexts/editor'
import shortid from 'short-id'
import AlertContext from '../../../contexts/alert'
import fb from '../../../config/firebase'
import moment from 'moment'
import DocumentField from '../../../components/Fields/DocumentField'
import Spinner from '../../../components/Spinner'

const Container = styled(Box)`
  display: flex;
  width: 100%;
  justify-content: center;
  padding-top: 1rem;

  .paper {
    max-width: 960px;
    width: 100%;
    /*padding: 1rem 1rem;*/
  }
`

const Page = () => {
  const router = useRouter()
  const { query: { id } } = router
  const { showMessage } = React.useContext(AlertContext)
  const [document, setDocument] = React.useState(DOCUMENT_TEMPLATE)
  const [load, setLoad] = React.useState(true)

  const onChangeField = (id, data) => {
    const array = [...document.fields].map(field => field.id === id ? ({ ...field, ...data }) : field)
    setDocument({ ...document, fields: array })
  }

  const onDeleteField = id => {
    const array = [...document.fields].filter(field => field.id !== id)
    setDocument({ ...document, fields: array })
  }

  const onChangeTitle = _title => {
    setDocument({ ...document, title: _title })
  }

  const onCreateFile = type => {
    const field = {
      id: shortid.generate(),
      ...FIELDS[type]
    }

    showMessage('Elemento creado con éxito', 'success', 3000)
    const array = [...document.fields, field]
    setDocument({ ...document, fields: array })
  }

  const handleSave = () => {
    try {
      if (!id) return null

      const date = moment().valueOf()

      fb.db.collection('pages').doc(id).update({
        lastModified: date,
        fields: document.fields,
        title: document.title
      }).then(() => {
        showMessage('Cambios guardados', 'success')
      })
    } catch (error) {
      showMessage(error.message, 'error')
    }
  }

  React.useEffect(() => {
    const getDocument = () => {
      try {
        if (!id) return null

        if (load) {
          fb.db.collection('pages').doc(id).get().then(snap => {
            setDocument(snap.data())
            setLoad(false)
          })
        }
      } catch (error) {
        showMessage(error.message, 'error')
      }
    }

    getDocument()
  }, [id, load])

  if (load) return <Spinner />

  const { fields } = document

  return (
    <EditorContext.Provider
      value={{
        title: document.title,
        onCreateFile,
        onChangeField,
        onDeleteField
      }}
    >
      <EditorLayout onSave={handleSave} onChangeTitle={onChangeTitle}>
        <Container>
          <Box component={Paper} variant="outlined" className="paper">
            <Grid container spacing={1} alignContent="flex-start" alignItems="flex-start" justify="flex-start">
              {fields.map(field => (
                <DocumentField key={field.id} {...field} />
              ))}
            </Grid>
          </Box>
        </Container>
      </EditorLayout>
    </EditorContext.Provider>
  )
}

export default Page
