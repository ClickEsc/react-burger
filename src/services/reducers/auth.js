import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED
} from '../actions/auth';

const initialState = {
  signupRequest: false,
  signupFailed: false,
  loginRequest: false,
  loginFailed: false,
  user: null
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST: {
      return {
        ...state,
        signupRequest: true
      };
    }
    case SIGNUP_SUCCESS: {
      return {
        ...state,
        signupRequest: false,
        signupFailed: false,
        user: action.user
      };
    }
    case SIGNUP_FAILED: {
      return {
        ...state,
        signupFailed: true,
        signupRequest: false
      };
    }
    case LOGIN_REQUEST: {
      return {
        ...state,
        loginRequest: true
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        loginRequest: false,
        loginFailed: false,
        user: action.user
      };
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        loginFailed: true,
        loginRequest: false
      };
    }
    default: {
      return state;
    }
  }
};