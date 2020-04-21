import { 
    FETCH_VEGETABLES,
    FETCH_RICES,
    FETCH_OILS
} from './actionTypes'
// import { FOODS } from '../../api'
// import { db } from '../../firebase'

export const fetchVegetables = (vegetable) => dispatch => {

    // return db 
    //         .ref(FOODS)
    //         .orderByChild('category/title')
    //         .equalTo('ဟင်းသီးဟင်းရွက်')
    //         .on('value' , snapshot => {
    //             let data = []
    //             snapshot.forEach(snap => {
    //                 data.push(snap.val())
    //             })
    //             const allItems = data.reverse()
                
    //             let vegetables = allItems
        
    //             return dispatch({
    //                 type: FETCH_VEGETABLES,
    //                 payload: vegetables
    //             })
    //         })

    return dispatch({
        type: FETCH_VEGETABLES,
        payload: vegetable
    })
            
}

export const fetchRices = (rice) => dispatch => {

    // return db 
    //         .ref(FOODS)
    //         .orderByChild('category/title')
    //         .equalTo('ဆန်')
    //         .on('value' , snapshot => {
    //             let data = []
    //             snapshot.forEach(snap => {
    //                 data.push(snap.val())
    //             })
    //             const allItems = data.reverse()
                
    //             let rices = allItems
        
    //             return dispatch({
    //                 type: FETCH_RICES,
    //                 payload: rices
    //             })
    //         })

    return dispatch({
        type: FETCH_RICES,
        payload: rice
    })
}

export const fetchOils = (oil) => dispatch => {

    // return db 
    //         .ref(FOODS)
    //         .orderByChild('category/title')
    //         .equalTo('ဆီ')
    //         .on('value' , snapshot => {
    //             let data = []
    //             snapshot.forEach(snap => {
    //                 data.push(snap.val())
    //             })
    //             const allItems = data.reverse()
                
    //             let oils = allItems
        
    //             return dispatch({
    //                 type: FETCH_OILS,
    //                 payload: oils
    //             })
    //         })

    return dispatch({
        type: FETCH_OILS,
        payload: oil
    })
}