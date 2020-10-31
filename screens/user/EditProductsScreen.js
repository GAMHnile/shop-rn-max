import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  TextInput,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/ui/HeaderButton";
//redux imports
import { useSelector, useDispatch } from "react-redux";
import {
  updateProduct,
  createProduct,
} from "../../redux/Products/products.actions";

const EditProductsScreen = (props) => {
  const prodId = props.navigation.getParam("productId");
  const selectedProduct = useSelector((state) =>
    state.products.userProducts.find((prod) => prod.id === prodId)
  );
  const dispatch = useDispatch();
  //local state slices
  const [title, setTitle] = useState(prodId ? selectedProduct.title : "");
  const [imageUrl, setImageUrl] = useState(
    prodId ? selectedProduct.imageUrl : ""
  );
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState(
    prodId ? selectedProduct.description : ""
  );

  const submitHandler = useCallback(() => {
    if (selectedProduct) {
      dispatch(updateProduct(prodId, title, imageUrl, description));
    } else {
      dispatch(createProduct(title, imageUrl, +price, description));
    }
    props.navigation.goBack();
  }, [prodId, title, imageUrl, price, description]);

  useEffect(() => {
    props.navigation.setParams({
      submit: submitHandler,
    });
  }, [submitHandler]);

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            value={title}
            style={styles.input}
            onChangeText={(text) => {
              setTitle(text);
            }}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image Url</Text>
          <TextInput
            value={imageUrl}
            style={styles.input}
            onChangeText={(text) => {
              setImageUrl(text);
            }}
          />
        </View>
        {selectedProduct ? null : (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              value={price}
              style={styles.input}
              onChangeText={(text) => {
                setPrice(text);
              }}
            />
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            value={description}
            style={styles.input}
            onChangeText={(text) => {
              setDescription(text);
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

EditProductsScreen.navigationOptions = (navData) => {
  const submitFn = navData.navigation.getParam("submit");
  return {
    headerTitle: navData.navigation.getParam("productId")
      ? "Edit product"
      : "Add product",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          iconName={
            Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
          }
          onPress={submitFn}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  form: { margin: 20 },
  formControl: {
    width: "100%",
    marginVertical: 10,
  },
  label: {
    fontFamily: "open-sans-bold",
  },
  input: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 2,
  },
});

export default EditProductsScreen;
