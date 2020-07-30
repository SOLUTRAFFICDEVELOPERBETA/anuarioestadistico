import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import fb from '../../config/firebase'
import PagesContext from '.'
import PagesReducer from './reducer'
import { GET_PAGES, GET_PAGES_ERROR } from '../../constants/types'
import AlertContext from '../alert'

const NAME_COLLECTION = 'pages'
const PagesProvider = ({ children }) => {
    const initialState = {
        pages: null,
        error: null
    }
    const { showMessage } = React.useContext(AlertContext)
    const [state, dispatch] = React.useReducer(PagesReducer, initialState);


    React.useEffect(() => {
        const getPages =  () => {
            try {
                 fb.db.collection(NAME_COLLECTION).onSnapshot(snap => {
                    const array = []
                    snap.forEach(doc => {
                        array.push({ ...doc.data(), id: doc.id })
                    })
                    dispatch({
                        type: GET_PAGES,
                        payload: array
                    })
                })
            } catch (error) {
                console.log(error)
                showMessage(error.message, 'error')
                dispatch({
                    type: GET_PAGES_ERROR
                })
            }

        }
        getPages()
    }, [])


    return (
        <PagesContext.Provider
            value={{
                pages: state.pages
            }}
        >
            {children}
        </PagesContext.Provider>
    )
}
PagesProvider.propTypes = {
    children: PropTypes.node.isRequired
}

export default PagesProvider
