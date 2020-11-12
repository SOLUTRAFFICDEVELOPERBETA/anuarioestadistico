import { GET_PALETTE, THEME_ERROR, EDIT_PALETTE, GET_THEME } from '../../../constants/types'

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
