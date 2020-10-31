import productTypes from './product.types';

export const deleteProduct = (productId) =>({
    type: productTypes.DELETE_PRODUCT,
    pid: productId
})

export const createProduct = (title, imageUrl, price, description) =>({
    type: productTypes.CREATE_PRODUCT,
    productData: {title, imageUrl, price, description}
});

export const updateProduct = (id,title, imageUrl, description)=>({
    type: productTypes.UPDATE_PRODUCT,
    pid: id,
    productData: {title, imageUrl, description}
})