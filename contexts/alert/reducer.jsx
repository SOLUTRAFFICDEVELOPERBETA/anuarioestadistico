import { SHOW_ALERT, CLOSE_ALERT } from '../../constants/types'

/**
 * @description Reducer que permite ejecutar la acciones el context de alert
 * @param {Object {}} state 
 * @param {Object {}} action 
 */
export default function AlertReducer (state, action) {
  switch (action.type) {
    case CLOSE_ALERT:
      return { message: null }
    case SHOW_ALERT:
      return { message: action.payload }
    default:
      return state
  }
}
