import React, { useEffect } from "react";
import {
  ActivityIndicator,
  View,
  AsyncStorage,
  StyleSheet,
} from "react-native";
import COLORS from "../constants/colors";
//Redux imports
import { useDispatch } from "react-redux";
import { authenticate, logout } from "../redux/auth/auth.actions";

const StartupScreen = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const tryLogin = async () => {
      try {
        const userData = await AsyncStorage.getItem("userData");
        if (!userData) {
          props.navigation.navigate("Auth");
        }
        const parsedData = await JSON.parse(userData);
        const { token, userId, expiryDate } = parsedData;
        if (new Date() >= new Date(expiryDate) || !token || !userId) {
          dispatch(logout);
          return props.navigation.navigate("Auth");
        }
        dispatch(authenticate(token, userId));
        props.navigation.navigate("ProdOrders");
      } catch (err) {}
    };

    tryLogin();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={COLORS.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StartupScreen;
