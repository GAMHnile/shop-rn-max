import React, { useState, useReducer, useCallback, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  View,
  Button,
  Alert,
  ActivityIndicator
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Input from "../../components/ui/Input";
import Card from "../../components/ui/Card";
import COLORS from "../../constants/colors";
import { useHeaderHeight } from "react-navigation-stack";
//redux imports
import { useDispatch } from "react-redux";
import { signUp, login } from "../../redux/auth/auth.actions";

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

const AuthScreen = (props) => {
  const [isSignup, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const headerHeight = useHeaderHeight();
  const [formState, dispatchForForm] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidities: {
      email: false,
      password: false,
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

  const authHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert(
        "Wrong input",
        "Please check the values in your input fields",
        [{ text: "Okay" }]
      );
      return;
    }
    let action;
    if (isSignup) {
      action = signUp(
        formState.inputValues.email,
        formState.inputValues.password
      );
    }else{
      action = login(
        formState.inputValues.email,
        formState.inputValues.password
      );
    }
    setLoading(true);
    try {
      await dispatch(action);
      props.navigation.navigate('ProdOrders');
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, [formState, isSignup, setError, setLoading ]);

  useEffect(()=>{
    if(error){
      Alert.alert("An error occured", error, [{text:"Okay"}])
    }
  },[error])
  return (
    <KeyboardAvoidingView
      style={styles.screen}
      //behavior="padding"
      keyboardVerticalOffset={headerHeight + 50}
    >
      <LinearGradient style={styles.gradient} colors={["#ffedff", "#ffe3ff"]}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              label="E-mail"
              id="email"
              keyboardType="email-address"
              autoCappitalization="none"
              required
              email
              initialValue=""
              errorMessage="Please enter a valid email address"
              onInputChange={inputChangeHandler}
            />
            <Input
              label="Password"
              id="password"
              keyboardType="default"
              autoCappitalization="none"
              required
              minLength={5}
              secureTextEntry
              initialValue=""
              errorMessage="Please enter a valid email address"
              onInputChange={inputChangeHandler}
            />
            {loading? 
            <ActivityIndicator size="small" color={COLORS.primary} />
            :<View style={styles.buttonContainer}>
              <Button
                title={isSignup? "Register" : "Login"}
                onPress={authHandler}
                color={COLORS.primary}
              />
            </View>}
            <View style={styles.buttonContainer}>
              <Button
                title={`Switch to ${isSignup? "Login" : "Register"}`}
                onPress={() => {
                  setIsSignUp(prevValue=> !prevValue);
                }}
                color={COLORS.accent}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = {
  headerTitle: "Authenticate",
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  gradient: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default AuthScreen;
