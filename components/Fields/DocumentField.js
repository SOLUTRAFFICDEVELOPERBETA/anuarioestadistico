import React from 'react'
import PropTypes from 'prop-types'
import { TITLE, PARAGRAPH, QUOTES, DIVIDER, LIST, IMAGE, TABLE, SUBTITLE } from '../../constants/documents'
import styled from '@emotion/styled'
import { Tooltip, Divider, Grid } from '@material-ui/core'
import ListField from './ListField'
import EditorContext from '../../contexts/editor'
import TableField from './TableField'
import TextInput from './TextInput'
import ImageField from './ImageField'

/*
// Contenedor de campos
const Field = styled.div`
  position: relative;

  .options {
    display: none;
    position: absolute;
    top: 5px;
    right: 5px;
  }

  :hover .options {
    display: flex;
  }
`

// Campo de titulo
const TitleField = styled.div`
  width: 100%;
  margin-bottom: 8px;
  overflow:hidden;
  word-break: break-all;
  min-height: 1rem;
  display: inline-block;
  padding: 8px;
  font-family: 'Open Sans', sans-serif;
  font-size: 2.125rem;
  font-weight: 400;
  line-height: 1.336;
  letter-spacing: 0.00735em;
  color: var(--primary);

  :hover {
    background-color: rgb(245,245,245);
  }

  :focus {
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: rgb(245,245,245);
    padding: 16px;
    font-family: 'Open Sans', sans-serif;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    letter-spacing: 0.00938em;
    color: #000;
  }
`

// Campo de párrafo
const ParagraphField = styled.div`
  width: 100%;
  word-break: break-all;
  margin-bottom: 8px;
  overflow:hidden;
  min-height: 1rem;
  display:inline-block;
  padding: 8px;
  font-family: 'Open Sans', sans-serif;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 0.00938em;

  :hover {
    background-color: rgb(245,245,245);
  }

  :focus {
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: rgb(245,245,245);
    padding: 16px;
  }
`

// Campo de Quotas
const QuotesField = styled.div`
  width: 100%;
  word-break: break-all;
  margin-bottom: 8px;
  overflow: hidden;
  min-height: 1rem;
  display: inline-block;
  padding: 8px;
  padding-left: 16px;
  font-style: italic;
  font-family: 'Open Sans', sans-serif;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 0.00938em;
  background-color: rgb(230,230,230);
  border-left: 5px solid rgb(200,200,200);

  :hover {
    background-color: rgb(245,245,245);
  }

  :focus {
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: rgb(245,245,245);
    padding: 16px;
    font-style: normal;
  }
`
*/
// Campo del divisor
const ColorDivider = styled.div`
  height: 8px;
  padding: 2px 0px;

  :hover {
    cursor: pointer;
    background-color: rgb(245,245,245);
  }

  :hover .MuiDivider-root {
    background-color: var(--primary)
  }
`

// Campos del documento
const DocumentField = ({ id, value, type, size }) => {
  const { onDeleteField } = React.useContext(EditorContext)

  const getField = () => {
    switch (type) {
      case SUBTITLE:
      case TITLE:
      case PARAGRAPH:
      case QUOTES:
        return <TextInput id={id} value={value} type={type} size={size} />
        /*
      case TITLE:
        return (
          <Field>
            <TitleField
              className="input"
              contentEditable
              id={id}
              onBlur={handleChange}
              dangerouslySetInnerHTML={{ __html: value }}
            />
            <div className="options">
              <IconButton size="small" onClick={() => onDeleteField(id)}>
                <Tooltip title="Borrar" placement="bottom">
                  <Delete fontSize="small" color="error" />
                </Tooltip>
              </IconButton>
            </div>
          </Field>
        )
      case PARAGRAPH:
        return (
          <Field>
            <ParagraphField
              contentEditable
              id={id}
              onBlur={handleChange}
              dangerouslySetInnerHTML={{ __html: value }}
            />
            <div className="options">
              <IconButton size="small" onClick={() => onDeleteField(id)}>
                <Tooltip title="Borrar" placement="bottom">
                  <Delete fontSize="small" color="error" />
                </Tooltip>
              </IconButton>
            </div>
          </Field>
        )
      case QUOTES:
        return (
          <Field>
            <QuotesField
              contentEditable
              id={id}
              onBlur={handleChange}
              dangerouslySetInnerHTML={{ __html: value }}
            />
            <div className="options">
              <IconButton size="small" onClick={() => onDeleteField(id)}>
                <Tooltip title="Borrar" placement="bottom">
                  <Delete color="error" />
                </Tooltip>
              </IconButton>
            </div>
          </Field>
        )
      */
      case DIVIDER:
        return (
          <Tooltip title="Eliminar">
            <ColorDivider onClick={() => onDeleteField(id)}>
              <Divider variant="middle" />
            </ColorDivider>
          </Tooltip>
        )
      case IMAGE:
        return <ImageField id={id} value={value} size={size} />
      case LIST:
        return <ListField id={id} value={value} size={size} />
      case TABLE:
        return <TableField id={id} value={value} />
      default:
        return null
    }
  }

  return (
    <Grid xl={size} lg={size} md={size} sm={12} xs={12}>
      {getField()}
    </Grid>
  )
}

DocumentField.propTypes = {
  id: PropTypes.string,
  value: PropTypes.any,
  type: PropTypes.string,
  size: PropTypes.number
}

DocumentField.defaultProps = {
  size: 12
}

export default DocumentField
