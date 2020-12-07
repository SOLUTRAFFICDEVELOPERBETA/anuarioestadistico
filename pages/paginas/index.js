import React from 'react';
import { Box } from '@material-ui/core';
import withAdmin from '../../HOC/withAdmin';
import DocumentsForm from '../../forms/DocumentsForm';
import DocumentsTable from '../../containers/DocumentsTable';
import AlertContext from '../../contexts/alert';
import fb from '../../config/firebase';
import moment from 'moment';
import styled from '@emotion/styled'
import { spacing, palette, compose } from '@material-ui/system';

const BoxContainer = styled(Box)`
 ${compose(
    spacing,
    palette
 )}
`
/**
 * @description Page que permite crear una nueva página o en listar las páginas creadas.
 * @see DocumentsTable
 * @see DocumentsForm
 */
const Page = () => {
    const [documents, setDocuments] = React.useState([]);
    const { showMessage } = React.useContext(AlertContext);

    // Método para eliminar una página.
    const handleDelete = (_id) => {
        try {
            if (window.confirm('¿ Esta seguro de querer borrar esta página ?')) {
                fb.db
                    .collection('pages')
                    .doc(_id)
                    .delete()
                    .then(() => {
                        showMessage('página borrada con éxito', 'success');
                        const array = [...documents].filter((doc) => doc.id !== _id);
                        setDocuments(array);
                    });
            }
        } catch (error) {
            showMessage(error.message, 'error');
        }
    };

    // Método para crear una nueva paǵina.
    const handleCreateDocument = (temp) => {
        try {
            const date = moment().valueOf();
            const doc = {
                title: temp.title,
                fields: temp.fields,
                created: date,
                lastModified: date
            };
            fb.db
                .collection('pages')
                .add(doc)
                .then((d) => {
                    setDocuments([{ ...doc, id: d.id }, ...documents]);
                    showMessage('Página creada con éxito', 'success');
                });
        } catch (error) {
            showMessage(error.message, 'error');
        }
    };

    // useEffect para obtener las páginas creadas.
    React.useEffect(() => {
        const getDocuments = () => {
            try {
                fb.db
                    .collection('pages')
                    .get()
                    .then((snap) => {
                        const array = [];
                        snap.forEach((doc) => {
                            array.push({ ...doc.data(), id: doc.id });
                        });

                        setDocuments(array);
                    });
            } catch (error) {
                showMessage(error.message, 'error');
            }
        };

        getDocuments();
    }, []);

    return (
        <BoxContainer padding={{xs: 1, sm: 1, md: 2, xl: 3}}>
            <DocumentsForm onSubmit={handleCreateDocument} />
            <DocumentsTable documents={documents} onDelete={handleDelete} />
        </BoxContainer>
    );
};

export default withAdmin(Page);
