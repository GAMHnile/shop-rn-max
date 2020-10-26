import React from 'react';
import { FlatList, StyleSheet, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cart/cart.actions'

import ProductItem from '../../components/shop/ProductItem';
import CustomHeaderButton from '../../components/ui/HeaderButton';

const ProductsOverviewScreen = props => {
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch()
    return (
        <FlatList data={products} keyExtractor={item => item.id} renderItem={(itemData) => {
            return <ProductItem
                title={itemData.item.title}
                image={itemData.item.imageUrl}
                price={itemData.item.price}
                onViewDetail={() => {
                    props.navigation.navigate("productDetail", {
                        productId: itemData.item.id,
                        productTitle: itemData.item.title
                    })
                }}
                onAddToCart={() => {
                    dispatch(addToCart(itemData.item));
                }}
            />
        }} />
    );
}

ProductsOverviewScreen.navigationOptions = (navData) => {
    return {
        headerTitle: "All products",
        headerLeft: ()=>(
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item 
                iconName={Platform.OS==="android"? "md-menu": "ios-menu"} 
                    onPress={()=>{
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
                    onPress={() => {navData.navigation.navigate("Cart") }}
                />
            </HeaderButtons>
        )
    }
}

const styles = StyleSheet.create({

});


export default ProductsOverviewScreen;