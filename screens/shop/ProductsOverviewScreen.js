import React from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';

import { useSelector } from 'react-redux';

import ProductItem from '../../components/shop/ProductItem';

const ProductsOverviewScreen = props => {
    const products = useSelector(state => state.products.availableProducts);
    return (
        <FlatList data={products} keyExtractor={item => item.id} renderItem={(itemData) => {
            return <ProductItem
                title={itemData.item.title}
                image={itemData.item.imageUrl}
                price={itemData.item.price}
                onViewDetail={()=>{}}
                onAddToCart={()=>{}}
            />
        }} />
    );
}

ProductsOverviewScreen.navigationOptions = {
    headerTitle: "All products"
}

const styles = StyleSheet.create({

});


export default ProductsOverviewScreen;