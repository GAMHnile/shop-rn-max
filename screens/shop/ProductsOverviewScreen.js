import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Platform,
  Button,
  Text,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../redux/cart/cart.actions";
import { fetchProducts } from "../../redux/Products/products.actions";

import ProductItem from "../../components/shop/ProductItem";
import CustomHeaderButton from "../../components/ui/HeaderButton";

import COLORS from "../../constants/colors";

const ProductsOverviewScreen = (props) => {
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState();
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();

  const loadProducts = useCallback(async () => {
    try {
      setError(false);
      setRefreshing(true);
      await dispatch(fetchProducts());
    } catch (err) {
      setError(err.message);
    }
    setRefreshing(false);
  }, [setError, setLoading, dispatch]);

  useEffect(() => {
    setLoading(true);
    loadProducts().then(() => {
      setLoading(false);
    });
  }, [loadProducts]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      "willFocus",
      loadProducts
    );
    return () => {
      willFocusSub.remove();
    };
  }, [loadProducts]);
  const selectItemHandler = (id, title) => {
    props.navigation.navigate("productDetail", {
      productId: id,
      productTitle: title,
    });
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }
  if (!loading && products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No products found please add some</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>Something went wrong, try again</Text>
        <Button
          title="Try again"
          color={COLORS.primary}
          onPress={loadProducts}
        />
      </View>
    );
  }

  return (
    <FlatList
      onRefresh={loadProducts}
      refreshing={refreshing}
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => {
        return (
          <ProductItem
            title={itemData.item.title}
            image={itemData.item.imageUrl}
            price={itemData.item.price}
            onSelect={() =>
              selectItemHandler(itemData.item.id, itemData.item.title)
            }
          >
            <Button
              color={COLORS.primary}
              title="View details"
              onPress={() =>
                selectItemHandler(itemData.item.id, itemData.item.title)
              }
            />
            <Button
              color={COLORS.primary}
              title="to Cart"
              onPress={() => {
                dispatch(addToCart(itemData.item));
              }}
            />
          </ProductItem>
        );
      }}
    />
  );
};

export const productsOverviewOptions = (navData) => {
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
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="View Cart"
          iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          onPress={() => {
            navData.navigation.navigate("Cart");
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProductsOverviewScreen;
