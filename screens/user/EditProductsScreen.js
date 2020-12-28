import React, { useEffect, useCallback, useReducer, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Platform,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/ui/HeaderButton";
import Input from "../../components/ui/Input";
//redux imports
import { useSelector, useDispatch } from "react-redux";
import {
  updateProduct,
  createProduct,
} from "../../redux/Products/products.actions";
import COLORS from "../../constants/colors";

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const prodId = props.route.params ? props.route.params.productId : null;
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

  const inputChangeHandler = useCallback(
    (id, inputValue, inputValidity) => {
      dispatchForForm({
        type: formTypes.FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: id,
      });
    },
    [dispatchForForm]
  );

  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert(
        "Wrong input",
        "Please check the values in your input fields",
        [{ text: "Okay" }]
      );
      return;
    }
    setLoading(true);
    setError(null);
    try {
      if (selectedProduct) {
        await dispatch(
          updateProduct(
            prodId,
            formState.inputValues.title,
            formState.inputValues.imageUrl,
            formState.inputValues.description
          )
        );
      } else {
        await dispatch(
          createProduct(
            formState.inputValues.title,
            formState.inputValues.imageUrl,
            +formState.inputValues.price,
            formState.inputValues.description
          )
        );
      }
      setLoading(false);
      props.navigation.goBack();
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  }, [prodId, formState]);
  useEffect(() => {
    if (error) {
      Alert.alert("An error occured", error, [{ text: "Okay" }]);
    }
  }, [error]);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            iconName={
              Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
            }
            onPress={submitHandler}
          />
        </HeaderButtons>
      ),
    });
  }, [submitHandler]);
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.form}>
          <Input
            id="title"
            label="Title"
            initialValue={prodId ? selectedProduct.title : ""}
            initialValidity={!!prodId}
            errorMessage="Please enter a valid Title"
            returnKeyType="next"
            autoCapitalize="sentences"
            autoCorrect
            onInputChange={inputChangeHandler}
            required
          />
          <Input
            id="imageUrl"
            label="Image Url"
            initialValue={prodId ? selectedProduct.imageUrl : ""}
            initialValidity={!!prodId}
            errorMessage="Please enter a valid image url"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            required
          />
          {selectedProduct ? null : (
            <Input
              id="price"
              label="price"
              errorMessage="Please enter a valid price"
              returnKeyType="next"
              keyboardType="decimal-pad"
              onInputChange={inputChangeHandler}
              required
              min={0.1}
            />
          )}
          <Input
            id="description"
            label="Description"
            initialValue={prodId ? selectedProduct.description : ""}
            initialValidity={!!prodId}
            errorMessage="Please enter a valid description"
            returnKeyType="next"
            multiline
            minLength={5}
            requred
            numberOfLines={3}
            onInputChange={inputChangeHandler}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export const editProductsScreenOptions = (navData) => {
  const routeParams = navData.route.params ? navData.route.params : {};
  return {
    headerTitle: routeParams.productId ? "Edit product" : "Add product",
  };
};

const styles = StyleSheet.create({
  form: { margin: 20 },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default EditProductsScreen;
