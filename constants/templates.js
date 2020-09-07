import {
    PARAGRAPH,
    TITLE,
    QUOTES,
    DIVIDER,
    LIST,
    IMAGE,
    TABLE,
    SECTION,
    CHART,
    IFRAME,
    CARD,
    SUBTITLE
} from './documents';
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
};

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
    [CARD]: {
        type: SECTION,
        size: 6,
        value: [
            {
                id: 'card-image',
                size: 4,
                type: IMAGE,
                value: {
                    name: 'Sin nombre, haga click para cambiar',
                    path: '',
                    url:
                        'https://firebasestorage.googleapis.com/v0/b/wise-365ab.appspot.com/o/assets%2Fno-img-placeholder-min.png?alt=media&token=c8f8b86f-0bdd-4258-87a1-8b83a3fa20dd'
                }
            },
            {
                id: 'card-title',
                type: SUBTITLE,
                size: 8,
                value: 'Titulo'
            },
            {
                id: 'card-content',
                type: TITLE,
                size: 12,
                value: 'Contenido'
            }
        ]
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
            url:
                'https://firebasestorage.googleapis.com/v0/b/wise-365ab.appspot.com/o/assets%2Fno-img-placeholder-min.png?alt=media&token=c8f8b86f-0bdd-4258-87a1-8b83a3fa20dd'
        }
    },
    [CHART]: {
        type: CHART,
        value: {}
    },
    [IFRAME]: {
        type: IFRAME,
        value: ''
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
};
