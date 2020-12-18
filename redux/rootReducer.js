import { combineReducers } from 'redux';
import productsReducer from './Products/products.reducer';
import cartReducer from './cart/cart.reducer';
import ordersReducer from './orders/orders.reducer';
import authReducer from './auth/auth.reducer';

const rootReducer = combineReducers({
    products: productsReducer,
    cart: cartReducer,
    orders: ordersReducer,
    auth: authReducer
})

export default rootReducer;