import {
    ADD_PRODUCT,
    REMOVE_PRODUCT,
    CHANGE_PRODUCT_QUANTITY,
    LOAD_CART,
    UPDATE_CART
} from './actionTypes'

export const addProduct = product => ({
    type: ADD_PRODUCT,
    payload: product
})

export const removeProduct = product => ({
    type: REMOVE_PRODUCT,
    payload: product
})

export const changeProductQuantity = product => ({
    type: CHANGE_PRODUCT_QUANTITY,
    payload: product
})

export const loadCart = products => ({
    type: LOAD_CART,
    payload: products
})

export const updateCart = product => ({
    type: UPDATE_CART,
    payload: product
})