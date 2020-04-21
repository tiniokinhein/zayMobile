import {
    ADD_ORDER,
    REMOVE_ORDER
} from './actionTypes'

const initialState = []

export default function (state=initialState, action) {
    switch (action.type) {
        case ADD_ORDER:
            let newArray = state.slice()
            newArray.splice(action.index, 0, action.payload)
            return newArray
            // return [
            //     ...state.slice(0),
            //     action.payload,
            //     ...state.slice(index)
            // ]
        case REMOVE_ORDER:
            let removeArray = state.slice()
            removeArray.splice(action.index, 1)
            return removeArray
            // return [
            //     ...state.slice(0, action.index),
            //     ...state.slice(action.index + 1)
            // ]
        default:
            return state
    }
}   