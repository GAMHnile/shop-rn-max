import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  ActivityIndicator,
  Alert
} from "react-native";
//redux imports
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../redux/cart/cart.actions";
import { addOrder } from "../../redux/orders/orders.actions";

import CartItem from "../../components/shop/CartItem";
import Card from "../../components/ui/Card";

import COLORS from "../../constants/colors";

const CartScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const cartItems = useSelector((state) => {
    const transformedCartItems = [];
    for (let key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }
    return transformedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  });

  const sendOrderHandler = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await dispatch(addOrder(cartItems, totalPrice));
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
    }
  };
  useEffect(()=>{
    if(error){
      Alert.alert("An error occured.", error, [{text: "okay"}])
    }
  },[error]);

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total Price is:{" "}
          <Text style={styles.ammount}>
            ${Math.round(totalPrice.toFixed(2) * 100) / 100}
          </Text>
        </Text>
        {isLoading ? (
          <ActivityIndicator color={COLORS.primary} size="small" />
        ) : (
          <Button
            title="Order now"
            color={COLORS.accent}
            disabled={cartItems.length === 0}
            onPress={sendOrderHandler}
          />
        )}
      </Card>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.productId}
        renderItem={(itemData) => {
          return (
            <CartItem
              quantity={itemData.item.quantity}
              title={itemData.item.productTitle}
              sum={itemData.item.sum}
              deletable
              onDelete={() => {
                dispatch(removeFromCart(itemData.item.productId));
              }}
            />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginBottom: 20,
  },
  summaryText: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
  ammount: {
    color: COLORS.primary,
  },
});

export default CartScreen;
