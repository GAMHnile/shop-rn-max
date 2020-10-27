import productTypes from './product.types';

export const deleteProduct = (productId) =>({
    type: productTypes.DELETE_PRODUCT,
    pid: productId
})