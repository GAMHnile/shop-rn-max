import PRODUCTS from "../../data/dummy-data";
import productTypes from "./product.types";
import Product from "../../models/products.models";

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((prod) => prod.ownerId === "u1"),
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case productTypes.SET_PRODUCTS:
      return {
        ...state,
        availableProducts: action.products,
        userProducts: action.products.filter((prod) => prod.ownerId === "u1")
      }
    case productTypes.CREATE_PRODUCT:
      const newProduct = new Product(
        action.productData.id,
        "u1",
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        action.productData.price
      );
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct),
      };
    case productTypes.UPDATE_PRODUCT:
      const productIndex = state.availableProducts.findIndex(
        (prod) => prod.id === action.pid
      );
      const userProductIndex = state.userProducts.findIndex(
        (prod) => prod.id === action.pid
      );

      const updatedProduct = new Product(
        state.availableProducts[productIndex].id,
        state.availableProducts[productIndex].ownerId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        state.availableProducts[productIndex].price
      );
      const updatedAvailableProducts = [...state.availableProducts];
      const updatedUserProducts = [...state.userProducts];
    
      updatedAvailableProducts[productIndex] = updatedProduct;
      updatedUserProducts[userProductIndex] = updatedProduct;

      return {
          ...state,
          availableProducts: updatedAvailableProducts,
          userProducts: updatedUserProducts
      }


    case productTypes.DELETE_PRODUCT:
      return {
        ...state,
        availableProducts: state.availableProducts.filter((product) => {
          return product.id !== action.pid;
        }),
        userProducts: state.userProducts.filter((product) => {
          return product.id !== action.pid;
        }),
      };
    default:
      return state;
  }
};

export default productsReducer;
