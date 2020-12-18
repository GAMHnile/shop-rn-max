import authTypes from "./auth.types";
const INITIAL_STATE = {
  token: null,
  userId: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case authTypes.AUTHENTICATE:
    case authTypes.LOGIN:
    case authTypes.SIGN_UP:
      return {
        token: action.payload.token,
        userId: action.payload.userId,
      };
    case authTypes.LOGOUT:
        return INITIAL_STATE;
    default:
      return state;
  }
};

export default authReducer;
