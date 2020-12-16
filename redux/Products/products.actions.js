import productTypes from "./product.types";
import Product from "../../models/products.models";

export const deleteProduct = (productId) => {
  return async (dispatch) => {
    try {
      await fetch(
        `https://rn-complete-guide-a9a99.firebaseio.com/products/${productId}.json`,
        {
          method: "DELETE",
        }
      );
      dispatch({
        type: productTypes.DELETE_PRODUCT,
        pid: productId,
      });
    } catch (err) {
      //handle error
    }
  };
};

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://rn-complete-guide-a9a99.firebaseio.com/products.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const resData = await response.json();
      const loadedProducts = [];

      for (const key in resData) {
        loadedProducts.push(
          new Product(
            key,
            "u1",
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price
          )
        );
      }

      dispatch({
        type: productTypes.SET_PRODUCTS,
        products: loadedProducts,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const createProduct = (title, imageUrl, price, description) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://rn-complete-guide-a9a99.firebaseio.com/products.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, imageUrl, price, description }),
        }
      );

      const resData = await response.json();

      dispatch({
        type: productTypes.CREATE_PRODUCT,
        productData: { id: resData.name, title, imageUrl, price, description },
      });
    } catch (err) {}
  };
};

export const updateProduct = (id, title, imageUrl, description) => {
  return async (dispatch) => {
    try {
      await fetch(
        `https://rn-complete-guide-a9a99.firebaseio.com/products/${id}.json`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, imageUrl, description }),
        }
      );

      dispatch({
        type: productTypes.UPDATE_PRODUCT,
        pid: id,
        productData: { title, imageUrl, description },
      });
    } catch (err) {
      //handle error
    }
  };
};
