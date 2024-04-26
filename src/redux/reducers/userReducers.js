// userReducers.js
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  UPDATE_USER_LAST_LOGIN_REQUEST,
  UPDATE_USER_LAST_LOGIN_SUCCESS,
  UPDATE_USER_LAST_LOGIN_FAIL,
} from "../constants/userConstants";
 
const initialState = {
  loading: false,
  success: false,
  error: null,
  userInfo: [],
  registerData: [],
  registrationData: [],
};

export const userLoginReducers = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST: 
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload }; 
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };

    case USER_LOGOUT:
      return {};

    default:
      return state;
  }
};

export const updateUserLastLoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER_LAST_LOGIN_REQUEST:
      return { laoding: true };
    case UPDATE_USER_LAST_LOGIN_SUCCESS:
      return { laoding: false, success: true, userInfo: action.payload };
    case UPDATE_USER_LAST_LOGIN_FAIL:
      return { laoding: false, error: action.payload };
    default:
      return state;
  }
};

export const userRegisterReducers = (state = initialState, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true, success: false, };
    case USER_REGISTER_SUCCESS:
      return { loading: false, success: true, registerData: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    
    case "STORE_REGISTRATION_DATA":
    return {
      ...state,
      registrationData: action.payload,
    };

    case USER_LOGOUT:  
      return {};

    default:
      return state;
  }
};
