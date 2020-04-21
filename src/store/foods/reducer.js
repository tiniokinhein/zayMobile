import { 
    FETCH_VEGETABLES,
    FETCH_RICES,
    FETCH_OILS
} from './actionTypes'

const initialState = {
    vegetables: [],
    rices: [],
    oils: []
}

export default function(state=initialState , action) {
    switch (action.type) {
        case FETCH_VEGETABLES:
            return {
                ...state,
                vegetables: action.payload
            }    
        case FETCH_RICES:
            return {
                ...state,
                rices: action.payload
            } 
        case FETCH_OILS:
            return {
                ...state,
                oils: action.payload
            } 
        default:
            return state
    }
}