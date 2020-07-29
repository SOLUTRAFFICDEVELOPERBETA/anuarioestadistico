import { SHOW_ALERT, CLOSE_ALERT } from '../../constants/types'

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
