import { LOGIN, LOGOUT, STOREUSERDATA } from "./actionsType";

const initialState = {
  isLoggedIn: false,
  token: null,
  userData: {},
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        token: action.payload, 
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        token: null,
      };
    case STOREUSERDATA:
      return {
        ...state,
        userData: action.payload,
      };
    default:
      return state;
  }
};

export default loginReducer;
