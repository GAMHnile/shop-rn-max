import React from 'react';
import { Platform, View, Button, SafeAreaView } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import UserProductScreen from '../screens/user/UserProductsScreen';
import EditProductsScreen from '../screens/user/EditProductsScreen';

import COLORS from '../constants/colors';
import AuthScreen from '../screens/user/AuthScreen';
import StartupScreen from '../screens/StartupScreen';

//redux imports 
import { useDispatch } from "react-redux";
import { logout } from "../redux/auth/auth.actions";

const defNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === "android" ? COLORS.primary : "",
    },
    headerTitleStyle: {
        fontFamily: "open-sans-bold"
    },
    headerBackTitleStyle: {
        fontFamily: "open-sans"
    },
    headerTintColor: Platform.OS === "android" ? "white" : COLORS.primary
};

const ProductsNavigator = createStackNavigator({
    productsOverview: ProductsOverviewScreen,
    productDetail: ProductDetailScreen,
    Cart: CartScreen
}, {
    defaultNavigationOptions: defNavOptions,
    navigationOptions: {
        drawerIcon: (drawerConfig) => {
            return (
                <Ionicons
                    name={Platform.OS ==="android"? "md-cart" : "ios-cart"}
                    size={23}
                    color={drawerConfig.tintColor}
                />
            )
        }
    }
})

const OrdersNavigator = createStackNavigator({
    Orders: OrdersScreen
}, {
    defaultNavigationOptions: defNavOptions,
    navigationOptions: {
        drawerIcon: (drawerConfig) => {
            return (
                <Ionicons
                    name={Platform.OS ==="android"?"md-list":"ios-list"}
                    size={23}
                    color={drawerConfig.tintColor}
                />
            )
        }
    }
})

const AdminNavigator = createStackNavigator({
    UserProducts: UserProductScreen,
    EditProducts: EditProductsScreen
},{
    defaultNavigationOptions: defNavOptions,
    navigationOptions: {
        drawerIcon: (drawerConfig)=>{
            return (
            <Ionicons
                name={Platform.OS==="android"? "md-create": "ios-create"}
                size={23}
                color={drawerConfig.tintColor}
            />
        )}
    }
})

const ProdOrdersNavigator = createDrawerNavigator({
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    Admin: AdminNavigator
}, {
    contentOptions: {
        activeTintColor: COLORS.primary
    },
    contentComponent: props => {
        const dispatch = useDispatch();
        return (
            <View style={{flex: 1, paddingTop: 30}}>
                <SafeAreaView forceInset={{top: "always", horizontal: "never"} } >
                    <DrawerItems {...props} />
                </SafeAreaView>
                <Button title="Logout" color={COLORS.primary} onPress={()=>{
                    dispatch(logout())
                    props.navigation.navigate("Auth");
                }} />
            </View>
        )
    }
})

const AuthNavigator = createStackNavigator({
    Auth: AuthScreen
}, {
    defaultNavigationOptions: defNavOptions
})

const MainNavigator = createSwitchNavigator({
    Startup: StartupScreen,
    Auth: AuthNavigator,
    ProdOrders: ProdOrdersNavigator
})


export default createAppContainer(MainNavigator);