import React, { useEffect, useCallback, useReducer } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Platform,
  Alert,
  KeyboardAvoidingView
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

  const inputChangeHandler = useCallback((id, inputValue, inputValidity) => {
    dispatchForForm({
      type: formTypes.FORM_INPUT_UPDATE,
      value: inputValue,
      isValid: inputValidity,
      input: id,
    });
  }, [dispatchForForm]);

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
    <KeyboardAvoidingView behavior="padding" style={{flex: 1}} > 
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
});

export default EditProductsScreen;
