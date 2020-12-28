import React, { useEffect } from "react";
import {
  ActivityIndicator,
  View,
  StyleSheet,
} from "react-native";
import COLORS from "../constants/colors";
import AsyncStorage from '@react-native-async-storage/async-storage';
//Redux imports
import { useDispatch } from "react-redux";
import { authenticate, logout, setDidTryAl } from "../redux/auth/auth.actions";

const StartupScreen = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const tryLogin = async () => {
      try {
        const userData = await AsyncStorage.getItem("userData");
        
        if (!userData) {
          //props.navigation.navigate("Auth");
          //console.log("no userData")
          return dispatch(setDidTryAl());
        }
        const parsedData = await JSON.parse(userData);
        //console.log(parsedData);
        const { token, userId, expiryDate } = parsedData;
        if (new Date() >= new Date(expiryDate) || !token || !userId) {
          //dispatch(logout);
          //return props.navigation.navigate("Auth");
          //console.log("token expired")
          return dispatch(setDidTryAl());
        }
        const expiryTime =new Date(expiryDate).getTime() - new Date().getTime();

        dispatch(authenticate(token, userId, expiryTime));
        //props.navigation.navigate("ProdOrders");
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
