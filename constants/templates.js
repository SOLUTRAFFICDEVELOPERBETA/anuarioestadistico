import { PARAGRAPH, TITLE, QUOTES, DIVIDER, LIST, IMAGE, TABLE, SECTION } from './documents'
export const DOCUMENT_TEMPLATE = {
  title: 'Documento sin Nombre',
  fields: [
    {
      id: 'project_title',
      type: TITLE,
      value: 'Titulo'
    },
    {
      id: 'content',
      type: PARAGRAPH,
      value: 'Contenido'
    }
  ]
}

export const FIELDS = {
  [TITLE]: {
    type: TITLE,
    value: 'Titulo'
  },
  [PARAGRAPH]: {
    type: PARAGRAPH,
    value: 'Contenido'
  },
  [QUOTES]: {
    type: QUOTES,
    value: 'Cita'
  },
  [SECTION]: {
    type: SECTION,
    value: []
  },
  [DIVIDER]: {
    type: DIVIDER,
    value: null
  },
  [LIST]: {
    type: LIST,
    value: []
  },
  [IMAGE]: {
    type: IMAGE,
    value: {
      name: 'Sin nombre, haga click para cambiar',
      path: '',
      url: 'https://firebasestorage.googleapis.com/v0/b/wise-365ab.appspot.com/o/assets%2Fno-img-placeholder-min.png?alt=media&token=c8f8b86f-0bdd-4258-87a1-8b83a3fa20dd'
    }
  },
  [TABLE]: {
    type: TABLE,
    value: {
      0: [
        {
          content: '',
          textSize: '16',
          bold: false,
          italic: false,
          cellColor: '#fff',
          textColor: '#000'
        },
        {
          content: '',
          textSize: '16',
          bold: false,
          italic: false,
          cellColor: '#fff',
          textColor: '#000'
        },
        {
          content: '',
          textSize: '16',
          bold: false,
          italic: false,
          cellColor: '#fff',
          textColor: '#000'
        }
      ],
      1: [
        {
          content: '',
          textSize: '16',
          bold: false,
          italic: false,
          cellColor: '#fff',
          textColor: '#000'
        },
        {
          content: '',
          textSize: '16',
          bold: false,
          italic: false,
          cellColor: '#fff',
          textColor: '#000'
        },
        {
          content: '',
          textSize: '16',
          bold: false,
          italic: false,
          cellColor: '#fff',
          textColor: '#000'
        }
      ]
    }
  }
}

export const documents = [
  {
    id: 'WgPns4dbIvwlqUCJQ2tX ',
    title: 'Manual de uso de aplicaciones',
    uid: 'Jesus Daniel Neira',
    icon: '',
    created: 1589236235954,
    lastModified: 1589236235954,
    fields: [
      {
        id: 'project_title',
        type: TITLE,
        value: 'Manual de uso de la aplicación, [Nombre de la aplicación]'
      },
      {
        id: 'content',
        type: PARAGRAPH,
        value: 'Introducción al manual'
      },
      {
        id: '70bb12',
        type: PARAGRAPH,
        value: 'Contenido sobre el manual de la aplicación'
      }
    ]
  },
  {
    id: 'Zy1Lq4eCG37U9DDZ07Qq',
    title: 'Documento en Blanco',
    uid: 'Alfredo Prado',
    icon: '',
    created: 1589236235954,
    lastModified: 1589236235954,
    fields: [
      {
        id: 'project_title',
        type: TITLE,
        value: 'Titulo'
      },
      {
        id: 'content',
        type: PARAGRAPH,
        value: 'Contenido'
      }
    ]
  },

]