import { IUser } from '../../utils/types';
import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILED,
  EDIT_PROFILE_REQUEST,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAILED,
  TAuthActions
} from '../actions/auth';
import { getCookie } from '../utils';

export type TAuthState = {
  signupRequest: boolean;
  signupFailed: boolean;
  loginRequest: boolean;
  loginFailed: boolean;
  logoutRequest: boolean;
  logoutFailed: boolean;
  forgotPasswordRequest: boolean;
  forgotPasswordFailed: boolean;
  isResetPasswordEmailSent: boolean;
  resetPasswordRequest: boolean;
  resetPasswordFailed: boolean;
  getProfileRequest: boolean;
  getProfileFailed: boolean;
  editProfileRequest: boolean;
  editProfileFailed: boolean;
  user: IUser
};

const initialState: TAuthState  = {
  signupRequest: false,
  signupFailed: false,
  loginRequest: false,
  loginFailed: false,
  logoutRequest: false,
  logoutFailed: false,
  forgotPasswordRequest: false,
  forgotPasswordFailed: false,
  isResetPasswordEmailSent: false,
  resetPasswordRequest: false,
  resetPasswordFailed: false,
  getProfileRequest: false,
  getProfileFailed: false,
  editProfileRequest: false,
  editProfileFailed: false,
  user: {
    isAuthorized: !!getCookie('accessToken'),
    name: '',
    email: '',
    password: ''
  }
};

export const authReducer = (state: TAuthState = initialState, action: TAuthActions): TAuthState => {
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
    case LOGOUT_REQUEST: {
      return {
        ...state,
        logoutRequest: true
      };
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        logoutRequest: false,
        logoutFailed: false,
        user: {
          ...state.user,
          isAuthorized: false,
        }
      };
    }
    case LOGOUT_FAILED: {
      return {
        ...state,
        logoutFailed: true,
        logoutRequest: false
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
    case GET_PROFILE_REQUEST: {
      return {
        ...state,
        getProfileRequest: true
      };
    }
    case GET_PROFILE_SUCCESS: {
      return {
        ...state,
        getProfileRequest: false,
        getProfileFailed: false,
        user: {
          ...state.user,
          name: action.user.name,
          email: action.user.email
        }
      };
    }
    case GET_PROFILE_FAILED: {
      return {
        ...state,
        getProfileFailed: true,
        getProfileRequest: false
      };
    }
    case EDIT_PROFILE_REQUEST: {
      return {
        ...state,
        editProfileRequest: true
      };
    }
    case EDIT_PROFILE_SUCCESS: {
      return {
        ...state,
        editProfileRequest: false,
        editProfileFailed: false,
        user: {
          ...state.user,
          name: action.user.name,
          email: action.user.email,
          password: action.user.password
        }
      };
    }
    case EDIT_PROFILE_FAILED: {
      return {
        ...state,
        editProfileFailed: true,
        editProfileRequest: false
      };
    }
    default: {
      return state;
    }
  }
};