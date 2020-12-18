import { AsyncStorage } from "react-native";
import authTypes from "./auth.types";

let timer;

export const authenticate = (token, userId, expiryTime) => (dispatch) => {
  dispatch(setLogoutTimer(expiryTime));
  dispatch({
    type: authTypes.AUTHENTICATE,
    payload: { token, userId },
  });
};

const saveDataToStorage = async (token, userId, expirationDate) => {
  try {
    await AsyncStorage.setItem(
      "userData",
      JSON.stringify({
        token: token,
        userId: userId,
        expiryDate: expirationDate.toISOString(),
      })
    );
  } catch (error) {
    console.log(err);
  }
};

export const signUp = (email, password) => async (dispatch) => {
  try {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDYhytN-ECuFw5ToBoaOdL4C48AoBq8YEo",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      let errmessage = "Something went wrong";
      if (errorData.error.message === "EMAIL_EXISTS") {
        errmessage = "E-mail already registered";
      }
      throw new Error(errmessage);
    }
    const resData = await response.json();
    //console.log(resData);
    dispatch(
      authenticate(
        resData.idToken,
        resData.localId,
        parseInt(resData.expiresIn) * 1000
      )
    );
    const expiryDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );
    saveDataToStorage(resData.idToken, resData.localId, expiryDate);
  } catch (err) {
    throw err;
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDYhytN-ECuFw5ToBoaOdL4C48AoBq8YEo",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      let errmessage = "Something went wrong";
      if (errorData.error.message === "INVALID_PASSWORD") {
        errmessage = "E-mail and password do not match";
      } else if (errorData.error.message === "EMAIL_NOT_FOUND") {
        errmessage = "This email has not been registered";
      }
      throw new Error(errmessage);
    }
    const resData = await response.json();
    //console.log(resData);
    dispatch(
      authenticate(
        resData.idToken,
        resData.localId,
        parseInt(resData.expiresIn) * 1000
      )
    );
    const expiryDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );
    saveDataToStorage(resData.idToken, resData.localId, expiryDate);
  } catch (err) {
    throw err;
  }
};

const setLogoutTimer = (expirationTime) => (dispatch) => {
  timer = setTimeout(() => {
    dispatch(logout());
  }, expirationTime);
};

export const logout = () => {
  AsyncStorage.removeItem("userData");
  clearTimeout(timer);
  return {
    type: authTypes.LOGOUT,
  };
};
