import cartTypes from './cart.types';
import orderTypes from '../orders/orders.types';
import CartItem from '../../models/cartItem.models';

const initialState = {
    items: {},
    totalPrice: 0
}


const cartReducer = (state=initialState, action) => {
    switch(action.type){
        case cartTypes.ADD_TO_CART:
            const prodId = action.payload.id;
            const prodTitle = action.payload.title;
            const prodPrice = action.payload.price;

            let newOrUpdatedItem;
            if(state.items[prodId]){
                //if product exists and is not undefined
                newOrUpdatedItem = new CartItem(
                    state.items[prodId].quantity + 1,
                    prodPrice, 
                    prodTitle, 
                    state.items[prodId].sum + prodPrice
                    );

            }else{
                newOrUpdatedItem = new CartItem(1, prodPrice, prodTitle, prodPrice)
            }

            return {
                ...state,
                items: {...state.items, [prodId]: newOrUpdatedItem},
                totalPrice: state.totalPrice + prodPrice
            }

        case cartTypes.REMOVE_FROM_CART:
            const selectedItem = state.items[action.pid];
            let updatedCartItems = {...state.items};
            if(selectedItem.quantity > 1){
                updatedCartItems[action.pid] = new CartItem(
                    selectedItem.quantity -1,
                    selectedItem.productPrice,
                    selectedItem.productTitle,
                    selectedItem.sum - selectedItem.productPrice
                )
            }else{
                //if only one of the item exists in cart
                delete updatedCartItems[action.pid]
            }

            return{
                ...state,
                items: updatedCartItems,
                totalPrice: state.totalPrice - selectedItem.productPrice
            }

        case orderTypes.ADD_ORDER:
            return initialState;
        default:
            return state
    }
}


export default cartReducer;