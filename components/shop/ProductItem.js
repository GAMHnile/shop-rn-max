import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';

import COLORS from '../../constants/colors';

const ProductItem = props => {
    return (
        <View style={styles.productItem}>
            <View style={styles.imageContainer}> 
                <Image style={styles.image} source={{uri: props.image}} />
            </View>
            <View style={styles.details}>
                <Text style={styles.title}>{props.title}</Text>
                <Text style={styles.price}>${props.price.toFixed(2)}</Text>
            </View>
            <View style={styles.actions}>
                <Button color={COLORS.primary} title="View details" onPress={props.onViewDetail}/>
                <Button color={COLORS.primary} title="to Cart" onPress={props.onAddToCart} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    productItem: {
        height: 300,
        elevation: 5,
        shadowColor: "black",
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        borderRadius: 10,
        margin: 20,
        backgroundColor: "white"
    },
    imageContainer: {
        height: "60%",
        width: "100%",
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10
    },
    image: {
        height: "100%",
        width: "100%"
    },
    title: {
        fontSize: 18,
        marginVertical: 4
    },
    price: {
        fontSize: 14,
        color: "#888"
    },
    actions: {
        height:"25%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20
    },
    details: {
        height: "15%",
        alignItems: "center"
    }
});

export default ProductItem;