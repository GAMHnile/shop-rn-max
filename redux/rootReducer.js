import { combineReducers } from 'redux';
import productsReducer from './Products/products.reducer';
import cartReducer from './cart/cart.reducer';
import ordersReducer from './orders/orders.reducer';

const rootReducer = combineReducers({
    products: productsReducer,
    cart: cartReducer,
    orders: ordersReducer
})

export default rootReducer;