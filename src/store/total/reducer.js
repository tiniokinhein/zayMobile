import { UPDATE_TOTAL_CART } from './actionTypes'

const initialState = {
    data: {
        productQuantity: 0,
        totalPrice: 0,
        currencyId: 'ကျပ်',
        currencyFormat: 'ကျပ်'
    }
}

export default function(state=initialState , action) {
    switch (action.type) {
        case UPDATE_TOTAL_CART:
            return {
                ...state,
                data: action.payload
            }
        default:
            return state
    }
}