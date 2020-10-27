import React from 'react';
import { FlatList, Platform, Text } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/ui/HeaderButton';
import OrderItem from '../../components/shop/OrderItem';
//redux imports
import { useSelector } from 'react-redux';

const OrdersScreen = props => {
    const orders = useSelector(state => state.orders.orders);
    return (
        <FlatList
            data={orders}
            renderItem={(itemData) => {
                return (
                    <OrderItem 
                        date={itemData.item.readableDate}
                        amount={itemData.item.totalAmmount}
                        items={itemData.item.items}
                    />
                )
            }}
            keyExtractor={(item) => item.id}
        />
    )
}

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
        )
    }
}



export default OrdersScreen;