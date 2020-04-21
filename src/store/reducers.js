import { combineReducers } from 'redux'
import foodReducer from './foods/reducer'
import cartReducer from './cart/reducer'
import totalReducer from './total/reducer'
import orderReducer from './order/reducer'
import wishlistReducer from './whishlist/reducer'

const Reducers = combineReducers({
    foods: foodReducer,
    cart: cartReducer,
    total: totalReducer,
    order: orderReducer,
    wishlist: wishlistReducer
})

export default Reducers