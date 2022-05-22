import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED
} from '../actions/auth';

const initialState = {
  signupRequest: false,
  signupFailed: false,
  loginRequest: false,
  loginFailed: false,
  forgotPasswordRequest: false,
  forgotPasswordFailed: false,
  isResetPasswordEmailSent: false,
  resetPasswordRequest: false,
  resetPasswordFailed: false,
  user: {
    isAuthorized: false,
    name: '',
    email: '',
    password: ''
  }
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
        user: {
          ...state.user,
          isAuthorized: false,
          name: action.user.name,
          email: action.user.email
        }
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
        user: {
          ...state.user,
          isAuthorized: true,
          name: action.user.name,
          email: action.user.email,
          password: action.user.password
        }
      };
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        loginFailed: true,
        loginRequest: false
      };
    }
    case FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        forgotPasswordRequest: true
      };
    }
    case FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        forgotPasswordRequest: false,
        forgotPasswordFailed: false,
        isResetPasswordEmailSent: true
      };
    }
    case FORGOT_PASSWORD_FAILED: {
      return {
        ...state,
        forgotPasswordFailed: true,
        forgotPasswordRequest: false
      };
    }
    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        resetPasswordRequest: true
      };
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        resetPasswordRequest: false,
        resetPasswordFailed: false,
        user: {
          ...state.user,
          password: action.user.password,
        }
      };
    }
    case RESET_PASSWORD_FAILED: {
      return {
        ...state,
        resetPasswordFailed: true,
        resetPasswordRequest: false
      };
    }
    default: {
      return state;
    }
  }
};