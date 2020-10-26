import React from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity, TouchableNativeFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CartItem = props => {
    let TouchableCmp = TouchableOpacity;
    if (Platform.OS === "android" && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback
    }

    return (
        <View style={styles.cartItem}>
            <View style={styles.itemData} >
                <Text style={styles.quantity}>{props.quantity} </Text> 
                <Text style={styles.mainText}>{props.title}</Text>
            </View>
            <View style={styles.itemData} >
                <Text style={styles.mainText} >{props.sum.toFixed(2)} </Text>
                <TouchableCmp style={styles.deleteButton} onPress={props.onDelete}>
                    <Ionicons
                    style={styles.deleteButton}
                        size={23}
                        name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
                        color="red"
                    />
                </TouchableCmp>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    cartItem: {
        flexDirection: "row",
        margin: 20,
        justifyContent: "space-between"
    },
    mainText: {
        fontFamily: "open-sans-bold",
        fontSize: 16
    },
    quantity: {
        fontFamily: "open-sans",
        fontSize: 16,
        color: "#888"
    },
    itemData: {
        flexDirection: "row",
        alignItems: "center"
    },
    deleteButton: {
        marginLeft: 20
    }
});


export default CartItem;