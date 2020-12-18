import React, { useEffect, useState } from "react";
import {
  FlatList,
  Platform,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet,
  View,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/ui/HeaderButton";
import OrderItem from "../../components/shop/OrderItem";
import COLORS from "../../constants/colors";
//redux imports
import { useSelector, useDispatch } from "react-redux";
import { fetchOrders } from "../../redux/orders/orders.actions";

const OrdersScreen = (props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);
  useEffect(() => {
    const fetchOrdersHandler = async () => {
      setLoading(true);
      setError(null);
      try {
        await dispatch(fetchOrders());
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(err);
      }
    };

    fetchOrdersHandler();
  }, [dispatch]);
  useEffect(() => {
    if (error) {
      Alert.alert("An error occured.", error, [{ text: "okay" }]);
    }
  }, [error]);

  if (orders.length === 0) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>You have no orders yet</Text>
      </View>
    );
  }
  return (
    <>
      {loading && (
        <View style={styles.centered}>
          <ActivityIndicator color={COLORS.primary} size="large" />
        </View>
      )}
      <FlatList
        data={orders}
        renderItem={(itemData) => {
          return (
            <OrderItem
              date={itemData.item.readableDate}
              amount={itemData.item.totalAmmount}
              items={itemData.item.items}
            />
          );
        }}
        keyExtractor={(item) => item.id}
      />
    </>
  );
};

OrdersScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Your Orders",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  centered: {
    height: "100%",
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OrdersScreen;
