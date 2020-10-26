import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import CartItem from './CartItem';

import COLORS from '../../constants/colors';

const OrderItem = props => {
    return (
        <View style={styles.orderItem}>
            <View style={styles.summary}>
                <Text style={styles.price}>${props.amount}</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>
            <Button title="view details" color={COLORS.primary} />
        </View>
    )
}

const styles = StyleSheet.create({
    orderItem: {
        backgroundColor: "white",
        elevation: 5,
        shadowColor: "black",
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        margin: 20,
        padding: 10,
        borderRadius: 10,
        alignItems: "center"
    },
    summary: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        marginBottom: 15
    },
    date: {
        fontFamily: "open-sans",
        color: "#888",
        fontSize: 16
    },
    price: {
        fontFamily: "open-sans-bold",
        fontSize: 16
    }
});

export default OrderItem;