import authTypes from "./auth.types";
const INITIAL_STATE = {
  token: null,
  userId: null,
  didTryAl: false,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case authTypes.AUTHENTICATE:
    case authTypes.LOGIN:
    case authTypes.SIGN_UP:
      return {
        token: action.payload.token,
        userId: action.payload.userId,
        didTryAl: true,
      };
    case authTypes.SET_DID_TRY_AL:
      return { ...state, didTryAl: true };
    case authTypes.LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default authReducer;
