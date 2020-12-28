import React from "react";
import { Platform, View, Button, SafeAreaView } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
// import { createAppContainer, createSwitchNavigator } from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack';
// import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { Ionicons } from "@expo/vector-icons";

import ProductsOverviewScreen, {
  productsOverviewOptions,
} from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen, {
  productDetailScreenOptions,
} from "../screens/shop/ProductDetailScreen";
import CartScreen, { cartScreenOptions } from "../screens/shop/CartScreen";
import OrdersScreen, {
  ordersScreenOptions,
} from "../screens/shop/OrdersScreen";
import UserProductScreen, {
  userProductScreenOptions,
} from "../screens/user/UserProductsScreen";
import EditProductsScreen, {editProductsScreenOptions} from "../screens/user/EditProductsScreen";

import COLORS from "../constants/colors";
import AuthScreen, { authScreenOptions } from "../screens/user/AuthScreen";
//import StartupScreen from "../screens/StartupScreen";

//redux imports
import { useDispatch } from "react-redux";
import { logout } from "../redux/auth/auth.actions";

const defNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? COLORS.primary : "",
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerTintColor: Platform.OS === "android" ? "white" : COLORS.primary,
};

const ProductsStackNavigator = createStackNavigator();

export const ProductsNavigator = (props) => (
  <ProductsStackNavigator.Navigator screenOptions={defNavOptions}>
    <ProductsStackNavigator.Screen
      name="productsOverview"
      component={ProductsOverviewScreen}
      options={productsOverviewOptions}
    />
    <ProductsStackNavigator.Screen
      name="productDetail"
      component={ProductDetailScreen}
      options={productDetailScreenOptions}
    />
    <ProductsStackNavigator.Screen
      name="Cart"
      component={CartScreen}
      options={cartScreenOptions}
    />
  </ProductsStackNavigator.Navigator>
);

// const ProductsNavigator = createStackNavigator(
//   {
//     productsOverview: ProductsOverviewScreen,
//     productDetail: ProductDetailScreen,
//     Cart: CartScreen,
//   },
//   {
//     defaultNavigationOptions: defNavOptions,
//     navigationOptions: {
//       drawerIcon: (drawerConfig) => {
//         return (
//           <Ionicons
//             name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
//             size={23}
//             color={drawerConfig.tintColor}
//           />
//         );
//       },
//     },
//   }
// );

const OrdersStackNavigator = createStackNavigator();
export const OrdersNavigator = () => {
  return (
    <OrdersStackNavigator.Navigator screenOptions={defNavOptions}>
      <OrdersStackNavigator.Screen
        name="Orders"
        component={OrdersScreen}
        options={ordersScreenOptions}
      />
    </OrdersStackNavigator.Navigator>
  );
};

// const OrdersNavigator = createStackNavigator(
//   {
//     Orders: OrdersScreen,
//   },
//   {
//     defaultNavigationOptions: defNavOptions,
//     navigationOptions: {
//       drawerIcon: (drawerConfig) => {
//         return (
//           <Ionicons
//             name={Platform.OS === "android" ? "md-list" : "ios-list"}
//             size={23}
//             color={drawerConfig.tintColor}
//           />
//         );
//       },
//     },
//   }
// );

const AdminStackNavigator = createStackNavigator();
export const AdminNavigator = () => {
  return (
    <AdminStackNavigator.Navigator screenOptions={defNavOptions}>
      <AdminStackNavigator.Screen
        name="UserProducts"
        component={UserProductScreen}
        options={userProductScreenOptions}
      />
      <AdminStackNavigator.Screen
        name="EditProducts"
        component={EditProductsScreen}
        options={editProductsScreenOptions}
      />
    </AdminStackNavigator.Navigator>
  );
};

// const AdminNavigator = createStackNavigator(
//   {
//     UserProducts: UserProductScreen,
//     EditProducts: EditProductsScreen,
//   },
//   {
//     defaultNavigationOptions: defNavOptions,
//     navigationOptions: {
//       drawerIcon: (drawerConfig) => {
//         return (
//           <Ionicons
//             name={Platform.OS === "android" ? "md-create" : "ios-create"}
//             size={23}
//             color={drawerConfig.tintColor}
//           />
//         );
//       },
//     },
//   }
// );

const ProdOrdersDrawerNavigator = createDrawerNavigator();

export const ProdOrdersNavigator = () => {
  const dispatch = useDispatch();
  return (
    <ProdOrdersDrawerNavigator.Navigator
      drawerContent={(props) => {
        return (
          <View style={{ flex: 1, paddingTop: 30 }}>
            <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
              <DrawerItemList {...props} />
            </SafeAreaView>
            <Button
              title="Logout"
              color={COLORS.primary}
              onPress={() => {
                dispatch(logout());
                //props.navigation.navigate("Auth");
              }}
            />
          </View>
        );
      }}
      drawerContentOptions={{
        activeTintColor: COLORS.primary,
      }}
    >
      <ProdOrdersDrawerNavigator.Screen
        name="Products"
        component={ProductsNavigator}
        options={{
          drawerIcon: (props) => {
            return (
              <Ionicons
                name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
                size={23}
                color={props.color}
              />
            );
          },
        }}
      />
      <ProdOrdersDrawerNavigator.Screen
        name="Orders"
        component={OrdersNavigator}
        options={{
          drawerIcon: (props) => {
            return (
              <Ionicons
                name={Platform.OS === "android" ? "md-list" : "ios-list"}
                size={23}
                color={props.color}
              />
            );
          },
        }}
      />
      <ProdOrdersDrawerNavigator.Screen
        name="Admin"
        component={AdminNavigator}
        options={{
          drawerIcon: (props) => {
            return (
              <Ionicons
                name={Platform.OS === "android" ? "md-create" : "ios-create"}
                size={23}
                color={props.color}
              />
            );
          },
        }}
      />
    </ProdOrdersDrawerNavigator.Navigator>
  );
};

// const ProdOrdersNavigator = createDrawerNavigator(
//   {
//     Products: ProductsNavigator,
//     Orders: OrdersNavigator,
//     Admin: AdminNavigator,
//   },
//   {
//     contentOptions: {
//       activeTintColor: COLORS.primary,
//     },
//     contentComponent: (props) => {
//       const dispatch = useDispatch();
//       return (
//         <View style={{ flex: 1, paddingTop: 30 }}>
//           <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
//             <DrawerItems {...props} />
//           </SafeAreaView>
//           <Button
//             title="Logout"
//             color={COLORS.primary}
//             onPress={() => {
//               dispatch(logout());
//               props.navigation.navigate("Auth");
//             }}
//           />
//         </View>
//       );
//     },
//   }
// );

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator screenOptions={defNavOptions}>
      <AuthStackNavigator.Screen
        name="Auth"
        component={AuthScreen}
        options={authScreenOptions}
      />
    </AuthStackNavigator.Navigator>
  );
};

// const AuthNavigator = createStackNavigator(
//   {
//     Auth: AuthScreen,
//   },
//   {
//     defaultNavigationOptions: defNavOptions,
//   }
// );

// const MainNavigator = createSwitchNavigator({
//   Startup: StartupScreen,
//   Auth: AuthNavigator,
//   ProdOrders: ProdOrdersNavigator,
// });

// export default createAppContainer(MainNavigator);
