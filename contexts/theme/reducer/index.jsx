import { GET_PALETTE, THEME_ERROR, EDIT_PALETTE, GET_THEME } from '../../../constants/types'
/**
 * @description Reducer que permite ejecutar la acciones el context de Theme
 * @param {Object {}} state 
 * @param {Object {}} action 
 */
export default function ThemeReducer (state, action) {
  switch (action.type) {
    case GET_THEME:
      return {
        ...state,
        ...action.payload
      }
    case EDIT_PALETTE:
    case GET_PALETTE:
      return {
        ...state,
        palette: action.payload
      }
    case THEME_ERROR:
    default:
      return state
  }
}
