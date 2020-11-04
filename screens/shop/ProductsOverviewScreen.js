import React, {useEffect} from 'react';
import { FlatList, StyleSheet, Platform, Button } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cart/cart.actions'
import { fetchProducts } from '../../redux/Products/products.actions';

import ProductItem from '../../components/shop/ProductItem';
import CustomHeaderButton from '../../components/ui/HeaderButton';

import COLORS from '../../constants/colors';

const ProductsOverviewScreen = props => {
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchProducts());
    },[dispatch]);

    const selectItemHandler = (id, title) => {
        props.navigation.navigate("productDetail", {
            productId: id,
            productTitle: title
        })
    }

    return (
        <FlatList data={products} keyExtractor={item => item.id} renderItem={(itemData) => {
            return <ProductItem
                title={itemData.item.title}
                image={itemData.item.imageUrl}
                price={itemData.item.price}
                onSelect={() => selectItemHandler(itemData.item.id, itemData.item.title)}
            >
                <Button
                    color={COLORS.primary}
                    title="View details"
                    onPress={() => selectItemHandler(itemData.item.id, itemData.item.title)}
                />
                <Button
                    color={COLORS.primary}
                    title="to Cart"
                    onPress={() => {
                        dispatch(addToCart(itemData.item));
                    }}
                />
            </ProductItem>
        }} />
    );
}

ProductsOverviewScreen.navigationOptions = (navData) => {
    return {
        headerTitle: "All products",
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        ),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton} >
                <Item
                    title="View Cart"
                    iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
                    onPress={() => { navData.navigation.navigate("Cart") }}
                />
            </HeaderButtons>
        )
    }
}

const styles = StyleSheet.create({

});


export default ProductsOverviewScreen;