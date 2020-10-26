import React from 'react';
import { FlatList, Platform, Text } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/ui/HeaderButton';
//redux imports
import { useSelector } from 'react-redux';

const OrdersScreen = props => {
    const orders = useSelector(state => state.orders.orders);
    return (
        <FlatList
            data={orders}
            renderItem={(itemData) => <Text>{itemData.item.totalAmmount}</Text>}
            keyExtractor={(item) => item.id}
        />
    )
}

OrdersScreen.navigationOptions = (navData)=>{

    return {
        headerTitle: "Your Orders",
        headerLeft: ()=>(
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item 
                iconName={Platform.OS==="android"? "md-menu": "ios-menu"} 
                    onPress={()=>{
                        navData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        )
    }
}



export default OrdersScreen;