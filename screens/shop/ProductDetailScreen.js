import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Button } from 'react-native';
//redux imports
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cart/cart.actions';

import COLORS from '../../constants/colors';

const ProductDetailScreen = props => {
    const productId = props.navigation.getParam("productId");
    const selectedProduct = useSelector(state => state.products.availableProducts.find(prod => {
        return prod.id === productId;
    }))
    const dispatch = useDispatch();


    return (
        <ScrollView>
            <Image style={styles.Image} source={{ uri: selectedProduct.imageUrl }} />
            <View style={styles.actions}>
                <Button color={COLORS.primary} title="Add to cart" onPress={()=>{
                    dispatch(addToCart(selectedProduct))
                }} />
            </View>
            <Text style={styles.price} >${selectedProduct.price}</Text>
            <Text style={styles.description} >{selectedProduct.description}</Text>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    Image: {
        width: "100%",
        height: 300
    },
    actions: {
        alignItems: "center",
        marginVertical: 10
    },
    price: {
        fontSize: 20,
        textAlign: "center",
        marginVertical: 20,
        fontFamily: "open-sans-bold"
    },
    description: {
        fontSize: 14,
        textAlign: "center",
        marginHorizontal: 20,
        fontFamily: "open-sans"
    }
});

ProductDetailScreen.navigationOptions = (navData) => {

    return {
        headerTitle: navData.navigation.getParam("productTitle")
    }
}


export default ProductDetailScreen;