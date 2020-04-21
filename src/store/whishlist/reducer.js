import {
    ADD_WISH,
    REMOVE_WISH,
    FETCH_WISH
} from './actionTypes'

const initialState = {
    wishes: []
}

export default function(state=initialState , action) {
    switch (action.type) {
        case FETCH_WISH:
            return {
                ...state,
                wishes: action.payload
            }

        case ADD_WISH:
            return {
                ...state,
                add_wish: Object.assign({}, action.payload)
            }
        
        case REMOVE_WISH:
            return {
                ...state,
                remove_wish: Object.assign({}, action.payload)
            }
    
        default:
            return state
    }
}