import React, { useState } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import CartItem from "./CartItem";
import Card from "../ui/Card";

import COLORS from "../../constants/colors";

const OrderItem = (props) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <Card style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.price}>${props.amount.toFixed(2)}</Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>
      <Button
        title={showDetails ? "Hide details" : "View details"}
        color={COLORS.primary}
        onPress={() => setShowDetails((prevShow) => !prevShow)}
      />
      {showDetails && (
        <View style={styles.detailItems}>
          {props.items.map((item) => (
            <CartItem
              key={item.productId}
              sum={item.sum}
              quantity={item.quantity}
              title={item.productTitle}
            />
          ))}
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    margin: 20,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  date: {
    fontFamily: "open-sans",
    color: "#888",
    fontSize: 16,
  },
  price: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },
  detailItems: {
    width: "100%",
  },
});

export default OrderItem;
