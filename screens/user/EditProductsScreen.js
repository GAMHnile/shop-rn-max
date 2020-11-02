import React, { useEffect, useCallback, useReducer } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  TextInput,
  Alert,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/ui/HeaderButton";
//redux imports
import { useSelector, useDispatch } from "react-redux";
import {
  updateProduct,
  createProduct,
} from "../../redux/Products/products.actions";

const formTypes = {
  FORM_INPUT_UPDATE: "FORM_INPUT_UPDATE",
};

const formReducer = (state, action) => {
  if (action.type === formTypes.FORM_INPUT_UPDATE) {
    const updatedInputValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedInputValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (let key in updatedInputValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedInputValidities[key];
    }

    return {
      ...state,
      inputValues: updatedInputValues,
      inputValidities: updatedInputValidities,
      formIsValid: updatedFormIsValid,
    };
  }
  return state;
};

const EditProductsScreen = (props) => {
  const prodId = props.navigation.getParam("productId");
  const selectedProduct = useSelector((state) =>
    state.products.userProducts.find((prod) => prod.id === prodId)
  );
  const dispatch = useDispatch();

  const [formState, dispatchForForm] = useReducer(formReducer, {
    inputValues: {
      title: prodId ? selectedProduct.title : "",
      imageUrl: prodId ? selectedProduct.imageUrl : "",
      price: "",
      description: prodId ? selectedProduct.description : "",
    },
    inputValidities: {
      title: prodId ? true : false,
      imageUrl: prodId ? true : false,
      price: prodId ? true : false,
      description: prodId ? true : false,
    },
    formIsValid: false,
  });

  const textChangeHandler = (inputIdentifier, text) => {
    let isValid = false;
    if (text.trim().length > 0) {
      isValid = true;
    } 
    dispatchForForm({
      type: formTypes.FORM_INPUT_UPDATE,
      value: text,
      isValid: isValid,
      input: inputIdentifier,
    });
  };

  const submitHandler = useCallback(() => {
    if (!formState.formIsValid) {
      Alert.alert(
        "Wrong input",
        "Please check the values in your input fields",
        [{ text: "Okay" }]
      );
      return;
    }
    if (selectedProduct) {
      dispatch(
        updateProduct(
          prodId,
          formState.inputValues.title,
          formState.inputValues.imageUrl,
          formState.inputValues.description
        )
      );
    } else {
      dispatch(
        createProduct(
          formState.inputValues.title,
          formState.inputValues.imageUrl,
          +formState.inputValues.price,
          formState.inputValues.description
        )
      );
    }
    props.navigation.goBack();
  }, [prodId, formState]);

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
            value={formState.inputValues.title}
            style={styles.input}
            onChangeText={textChangeHandler.bind(this, "title")}
            returnKeyType="next"
            autoCapitalize="sentences"
            autoCorrect
          />
          {!formState.inputValidities.title && (
            <Text>Please enter a valid title</Text>
          )}
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image Url</Text>
          <TextInput
            value={formState.inputValues.imageUrl}
            style={styles.input}
            onChangeText={textChangeHandler.bind(this, "imageUrl")}
          />
        </View>
        {selectedProduct ? null : (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              value={formState.inputValues.price}
              style={styles.input}
              onChangeText={textChangeHandler.bind(this, "price")}
              keyboardType="decimal-pad"
            />
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            value={formState.inputValues.description}
            style={styles.input}
            onChangeText={textChangeHandler.bind(this, "description")}
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
