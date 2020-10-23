import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';

import COLORS from '../constants/colors';

const productsNavigator = createStackNavigator({
    productsOverview: ProductsOverviewScreen
},{
    defaultNavigationOptions:{
        headerStyle: {
            backgroundColor: Platform.OS==="android"? COLORS.primary: "",
        },
        headerTintColor: Platform.OS === "android"? "white" : COLORS.primary
    }
})


export default createAppContainer(productsNavigator);