/* eslint-disable indent */
import { LOG_IN, LOG_OUT, AUTH_ERROR, AUTH_STATE, GET_USER } from '../../constants/types'

export default function AuthReducer(state, action) {
    switch (action.type) {
        case GET_USER:
            return {
                ...state,
                user: action.payload
            }
        case AUTH_STATE:
        case LOG_IN:
            return {
                ...state,
                auth: action.payload
            }
        case AUTH_ERROR:
        case LOG_OUT:
            return {
                ...state,
                auth: null,
                user: null
            }
        default:
            return state
    }
}
