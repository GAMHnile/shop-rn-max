import React from 'react';
import { View, Text, Platform, StyleSheet, FlatList, Button } from 'react-native';
//redux imports
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../../redux/cart/cart.actions';
import { addOrder } from '../../redux/orders/orders.actions';

import CartItem from '../../components/shop/CartItem';

import COLORS from '../../constants/colors';

const CartScreen = props => {
    const dispatch = useDispatch();
    const totalPrice = useSelector(state => state.cart.totalPrice);
    const cartItems = useSelector(state => {
        const transformedCartItems = [];
        for (let key in state.cart.items) {
            transformedCartItems.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum
            })
        }
        return transformedCartItems.sort((a,b)=> a.productId > b.productId? 1: -1);
    });

    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>Total Price is: <Text style={styles.ammount}>${totalPrice.toFixed(2)}</Text></Text>
                <Button
                    title="Order now"
                    color={COLORS.accent}
                    disabled={cartItems.length === 0}
                    onPress={()=>dispatch(addOrder(cartItems, totalPrice))}
                />
            </View>
            <FlatList data={cartItems}
                keyExtractor={(item) => item.productId}
                renderItem={(itemData) => {
                    return (
                        <CartItem
                            quantity={itemData.item.quantity}
                            title={itemData.item.productTitle}
                            sum={itemData.item.sum}
                            deletable
                            onDelete={()=>{
                                dispatch(removeFromCart(itemData.item.productId))
                            }}
                        />)
                }} />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        margin: 20
    },
    summary: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white",
        elevation: 5,
        shadowColor: "black",
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        borderRadius: 10,
        padding: 10,
        marginBottom: 20
    },
    summaryText: {
        fontFamily: "open-sans-bold",
        fontSize: 18
    },
    ammount: {
        color: COLORS.primary
    }
})

export default CartScreen;