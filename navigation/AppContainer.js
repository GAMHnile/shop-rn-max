import React from "react";
//import ShopNavigator from "./ShopNavigator";
//import { NavigationActions } from "react-navigation";
//redux imports
//import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import {ProductsNavigator} from './ShopNavigator';

const AppContainer = (props) => {
  //   const isAuth = useSelector((state) => !!state.auth.token);
  //const navRef = useRef();
  //   useEffect(() => {
  //     if (!isAuth) {
  //       navRef.current.dispatch(
  //         NavigationActions.navigate({ routeName: "Auth" })
  //       );
  //     }
  //   }, [isAuth]);

  return (
    <NavigationContainer>
      <ProductsNavigator />
    </NavigationContainer>
  );
};

export default AppContainer;
