import React from 'react';
import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';

import COLORS from '../constants/colors';

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

const ProdOrdersNavigator = createDrawerNavigator({
    Products: ProductsNavigator,
    Orders: OrdersNavigator
}, {
    contentOptions: {
        activeTintColor: COLORS.primary
    }
})


export default createAppContainer(ProdOrdersNavigator);