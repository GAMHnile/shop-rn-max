import cartTypes from './cart.types';

export const addToCart = (product) =>({
    type: cartTypes.ADD_TO_CART,
    payload: product
});

export const removeFromCart = (productId) =>({
    type: cartTypes.REMOVE_FROM_CART,
    pid: productId
});