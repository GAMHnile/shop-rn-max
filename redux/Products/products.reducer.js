import PRODUCTS from '../../data/dummy-data';
import productTypes from './product.types'; 

const initialState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(prod=>prod.ownerId === "u1")
};

const productsReducer = (state=initialState, action) =>{
    switch(action.type){
        case productTypes.DELETE_PRODUCT:
            return {
                ...state,
                availableProducts: state.availableProducts.filter(product=>{
                   return product.id !== action.pid
                }),
                userProducts: state.availableProducts.filter(product=>{
                    return product.id !== action.pid
                 })
            }
        default:
            return state;
    }
}

export default productsReducer;