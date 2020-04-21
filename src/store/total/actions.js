import { UPDATE_TOTAL_CART } from './actionTypes'

export const updateTotalCart = cartProducts => dispatch => {

    let productQuantity = cartProducts.reduce((sum,p) => {
        sum += p.quantity 
        return sum
    }, 0)

    let totalPrice = cartProducts.reduce((sum,p) => {
        sum += p.price * p.quantity
        return sum
    }, 0)

    let cartTotal = {
        productQuantity,
        totalPrice,
        currencyId: 'ကျပ်',
        currencyFormat: 'ကျပ်'
    }

    dispatch({
        type: UPDATE_TOTAL_CART,
        payload: cartTotal
    })
}