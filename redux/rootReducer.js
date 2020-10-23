import { combineReducers } from 'redux';
import productsReducer from './Products/products.reducer';

const rootReducer = combineReducers({
    products: productsReducer
})

export default rootReducer;