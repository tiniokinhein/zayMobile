import {
    ADD_WISH,
    REMOVE_WISH,
    FETCH_WISH
} from './actionTypes'

export const addWish = wish => ({
    type: ADD_WISH,
    payload: wish
})

export const removeWish = wish => ({
    type: REMOVE_WISH,
    payload: wish
})

export const fetchWish = wishes => dispatch => {
    dispatch({
        type: FETCH_WISH,
        payload: wishes
    })
}