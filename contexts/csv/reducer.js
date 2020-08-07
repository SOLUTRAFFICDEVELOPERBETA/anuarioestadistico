import { GET_DATA_CSV, GET_DATA_CSV_ERROR } from "../../constants/types";


export default function CsvReducer(state, action) {
    switch (action.type) {
        case GET_DATA_CSV:
            return {
                dataGraphi: action.payload
            }

        case GET_DATA_CSV_ERROR:
            return {
                dataGraphi: null,
                error: true
            }


        default:
            return state;
    }
}