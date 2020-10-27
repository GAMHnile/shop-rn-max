import React from 'react';
import { FlatList, Platform, Button } from 'react-native';
import ProductItem from '../../components/shop/ProductItem';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/ui/HeaderButton';
//redux imports
import { useSelector, useDispatch } from 'react-redux';
import { deleteProduct } from '../../redux/Products/products.actions';

import COLORS from '../../constants/colors';

const UserProductScreen = props => {
    const userProducts = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();
    return (
        <FlatList
            data={userProducts}
            keyExtractor={(item) => item.id}
            renderItem={(itemData) => <ProductItem
                image={itemData.item.imageUrl}
                title={itemData.item.title}
                price={itemData.item.price}
                onSelect={() => { }}
            >
                <Button
                    color={COLORS.primary}
                    title="Edit"
                    onPress={() => { }}
                />
                <Button
                    color={COLORS.primary}
                    title="Delete"
                    onPress={() => { dispatch(deleteProduct(itemData.item.id)) }}
                />
            </ProductItem>
            }
        />
    );
}

UserProductScreen.navigationOptions = (navData) => {

    return {
        headerTitle: "Your Products",
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton} >
                <Item
                    title="Menu"
                    iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
                    onPress={() => { navData.navigation.toggleDrawer(); }}
                />
            </HeaderButtons>
        )
    }
}

export default UserProductScreen;