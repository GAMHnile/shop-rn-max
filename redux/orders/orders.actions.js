import Order from "../../models/order.model";
import orderTypes from "./orders.types";

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        `https://rn-complete-guide-a9a99.firebaseio.com/orders/${userId}.json`
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const resData = await response.json();
      const loadedOrders = [];

      for (const key in resData) {
        loadedOrders.push(
          new Order(
            key,
            resData[key].items,
            resData[key].total,
            new Date(resData[key].date)
          )
        );
      }

      dispatch({
        type: orderTypes.SET_ORDERS,
        payload: loadedOrders,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const addOrder = (cartItems, totalAmmount) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const date = new Date();
    try {
      const response = await fetch(
        `https://rn-complete-guide-a9a99.firebaseio.com/orders/${userId}.json?auth=${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items: cartItems,
            total: totalAmmount,
            date: date.toISOString(),
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const resData = await response.json();

      dispatch({
        type: orderTypes.ADD_ORDER,
        payload: {
          id: resData.name,
          items: cartItems,
          total: totalAmmount,
          date: date,
        },
      });
    } catch (err) {}
  };
};
