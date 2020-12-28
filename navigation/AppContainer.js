import React from "react";
//import ShopNavigator from "./ShopNavigator";
//import { NavigationActions } from "react-navigation";
//redux imports
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import {AuthNavigator, ProdOrdersNavigator} from './ShopNavigator';
import StartupScreen from "../screens/StartupScreen";


const AppContainer = (props) => {
    const isAuth = useSelector((state) => !!state.auth.token);
    const didTryAl = useSelector((state) => state.auth.didTryAl);
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
      { isAuth && <ProdOrdersNavigator />}
      {!isAuth && !didTryAl && <StartupScreen />}
      {!isAuth && didTryAl && <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppContainer;
