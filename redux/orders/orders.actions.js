import orderTypes from './orders.types';

export const addOrder = (cartItems, totalAmmount)=>({
    type: orderTypes.ADD_ORDER,
    payload: {
        items: cartItems,
        total: totalAmmount 
    }
});