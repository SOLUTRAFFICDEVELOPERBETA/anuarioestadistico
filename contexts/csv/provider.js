import React from 'react';
import CsvContext from './'
import CsvReducer from './reducer'
import fb from '../../config/firebase'
import AlertContext from '../alert'
import { GET_DATA_CSV, GET_DATA_CSV_ERROR } from '../../constants/types';
import { UploadFile } from '../../constants/files';




const CsvProvider = ({ children }) => {
    const initialState = {
        dataGraphi: null,
        error: null,
        loading: false
    }

    const { showMessage } = React.useContext(AlertContext)
    const [state, dispatch] = React.useReducer(CsvReducer, initialState);
    const [insert, setInsert] = React.useState(false)




    const createItemGraph = async (data) => {
        try {
            await fb.db.collection('graphics').doc('graphi').set(data , { merge: true }).then(() => {
                showMessage("la información se subió correctamente", 'success')
            })
        } catch (error) {
            console.log(error)
            showMessage(error.message, 'error')
        }

    }

    const updateGraphics = async (data, key) => {
        try {
            fb.db.collection('graphics').doc('graphi').update(data).then(() => {
                showMessage("Información actualizada correctamente", 'success')
            })
        } catch (error) {
            console.log(error)
            showMessage(error.message, 'error')
        }
    }

    React.useEffect(() => {
        const getInfoGraphi = async () => {
            await fb.db.collection('graphics').doc('graphi').onSnapshot((snap) => {
                dispatch({
                    type: GET_DATA_CSV,
                    payload: snap.data()
                })
            })
        }
        getInfoGraphi()
    }, [])
    return (
        <CsvContext.Provider value={{
            dataGraphi: state.dataGraphi,
            createItemGraph,
            updateGraphics
        }}>
            {children}
        </CsvContext.Provider>
    )
}


export default CsvProvider