import { GET_PAGES, GET_PAGES_ERROR } from '../../constants/types'
/**
 * @description Reducer que permite ejecutar la acciones el context de Pages
 * @param {Object {}} state 
 * @param {Object {}} action 
 */
export default function  PagesReducer (state, action) {
    switch (action.type) {
        case GET_PAGES:
            return {
                pages: action.payload
            }

        case GET_PAGES_ERROR:
            return {
                error: null
            }

        default:
            return state;
    }
}
