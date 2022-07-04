import {
  signupRequest,
  loginRequest,
  logoutRequest,
  forgotPasswordRequest,
  resetPasswordRequest,
  getProfileRequest,
  editProfileRequest
} from "../../api/auth";
import { IUser } from "../../utils/types";
import { TAppDispatch, TAppThunk } from "../types";

export const SIGNUP_REQUEST: 'SIGNUP_REQUEST' = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS: 'SIGNUP_SUCCESS' = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILED: 'SIGNUP_FAILED' = 'SIGNUP_FAILED';

export const LOGIN_REQUEST: 'LOGIN_REQUEST'  = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS: 'LOGIN_SUCCESS' = 'LOGIN_SUCCESS';
export const LOGIN_FAILED: 'LOGIN_FAILED' = 'LOGIN_FAILED';

export const LOGOUT_REQUEST: 'LOGOUT_REQUEST' = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS: 'LOGOUT_SUCCESS' = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED: 'LOGOUT_FAILED' = 'LOGOUT_FAILED';

export const FORGOT_PASSWORD_REQUEST: 'FORGOT_PASSWORD_REQUEST' = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS: 'FORGOT_PASSWORD_SUCCESS' = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED: 'FORGOT_PASSWORD_FAILED' = 'FORGOT_PASSWORD_FAILED';

export const RESET_PASSWORD_REQUEST: 'RESET_PASSWORD_REQUEST' = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS: 'RESET_PASSWORD_SUCCESS' = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED: 'RESET_PASSWORD_FAILED' = 'RESET_PASSWORD_FAILED';

export const GET_PROFILE_REQUEST: 'GET_PROFILE_REQUEST' = 'GET_PROFILE_REQUEST';
export const GET_PROFILE_SUCCESS: 'GET_PROFILE_SUCCESS' = 'GET_PROFILE_SUCCESS';
export const GET_PROFILE_FAILED: 'GET_PROFILE_FAILED' = 'GET_PROFILE_FAILED';

export const EDIT_PROFILE_REQUEST: 'EDIT_PROFILE_REQUEST' = 'EDIT_PROFILE_REQUEST';
export const EDIT_PROFILE_SUCCESS: 'EDIT_PROFILE_SUCCESS' = 'EDIT_PROFILE_SUCCESS';
export const EDIT_PROFILE_FAILED: 'EDIT_PROFILE_FAILED' = 'EDIT_PROFILE_FAILED';

// Типизация экшенов
export interface ISignupRequestAction {
  readonly type: typeof SIGNUP_REQUEST;
}

export interface ISignupSuccessAction {
  readonly type: typeof SIGNUP_SUCCESS;
  user: IUser;
}

export interface ISignupFailedAction {
  readonly type: typeof SIGNUP_FAILED;
}

export interface ILoginRequestAction {
  readonly type: typeof LOGIN_REQUEST;
}

export interface ILoginSuccessAction {
  readonly type: typeof LOGIN_SUCCESS;
  user: IUser;
}

export interface ILoginFailedAction {
  readonly type: typeof LOGIN_FAILED;
}

export interface ILogoutRequestAction {
  readonly type: typeof LOGOUT_REQUEST;
}

export interface ILogoutSuccessAction {
  readonly type: typeof LOGOUT_SUCCESS;
}

export interface ILogoutFailedAction {
  readonly type: typeof LOGOUT_FAILED;
}

export interface IForgotPasswordRequestAction {
  readonly type: typeof FORGOT_PASSWORD_REQUEST;
}

export interface IForgotPasswordSuccessAction {
  readonly type: typeof FORGOT_PASSWORD_SUCCESS;
}

export interface IForgotPasswordFailedAction {
  readonly type: typeof FORGOT_PASSWORD_FAILED;
}

export interface IResetPasswordRequestAction {
  readonly type: typeof RESET_PASSWORD_REQUEST;
}

export interface IResetPasswordSuccessAction {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
  readonly user: IUser;
}

export interface IResetPasswordFailedAction {
  readonly type: typeof RESET_PASSWORD_FAILED;
}

export interface IGetProfileRequestAction {
  readonly type: typeof GET_PROFILE_REQUEST;
}

export interface IGetProfileSuccessAction {
  readonly type: typeof GET_PROFILE_SUCCESS;
  readonly user: IUser;
}

export interface IGetProfileFailedAction {
  readonly type: typeof GET_PROFILE_FAILED;
}

export interface IEditProfileRequestAction {
  readonly type: typeof EDIT_PROFILE_REQUEST;
}

export interface IEditProfileSuccessAction {
  readonly type: typeof EDIT_PROFILE_SUCCESS;
  readonly user: IUser;
}

export interface IEditProfileFailedAction {
  readonly type: typeof EDIT_PROFILE_FAILED;
}

export type TAuthActions =
  | ISignupRequestAction
  | ISignupSuccessAction
  | ISignupFailedAction
  | ILoginRequestAction
  | ILoginSuccessAction
  | ILoginFailedAction
  | ILogoutRequestAction
  | ILogoutSuccessAction
  | ILogoutFailedAction
  | IForgotPasswordRequestAction
  | IForgotPasswordSuccessAction
  | IForgotPasswordFailedAction
  | IResetPasswordRequestAction
  | IResetPasswordSuccessAction
  | IResetPasswordFailedAction
  | IGetProfileRequestAction
  | IGetProfileSuccessAction
  | IGetProfileFailedAction
  | IEditProfileRequestAction
  | IEditProfileSuccessAction
  | IEditProfileFailedAction;

export const signup: TAppThunk = (form: HTMLFormElement) => (dispatch: TAppDispatch) => {
  return function (dispatch: TAppDispatch) {
    dispatch({
      type: SIGNUP_REQUEST
    });
    signupRequest(form)
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: SIGNUP_SUCCESS,
            user: {
              email: res.user.email,
              name: res.user.name,
              password: form.password
            }
          });
        } else {
          dispatch({
            type: SIGNUP_FAILED
          });
        }
      })
      .catch(err => {
        dispatch({
          type: SIGNUP_FAILED
        });
      })
  };
}

export const login: TAppThunk = (form: HTMLFormElement) => (dispatch: TAppDispatch) => {
  return function (dispatch: TAppDispatch) {
    dispatch({
      type: LOGIN_REQUEST
    });
    loginRequest(form)
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: LOGIN_SUCCESS,
            user: {
              password: form.password
            }
          });
        } else {
          dispatch({
            type: LOGIN_FAILED
          });
        }
      })
      .catch(err => {
        dispatch({
          type: LOGIN_FAILED
        });
      })
  };
}

export const logout: TAppThunk = () => (dispatch: TAppDispatch) => {
  return function (dispatch: TAppDispatch) {
    dispatch({
      type: LOGOUT_REQUEST
    });
    logoutRequest()
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: LOGOUT_SUCCESS
          });
        } else {
          dispatch({
            type: LOGOUT_FAILED
          });
        }
      })
      .catch(err => {
        dispatch({
          type: LOGOUT_FAILED
        });
      })
  };
}

export const forgotPassword: TAppThunk = (form: HTMLFormElement) => (dispatch: TAppDispatch) => {
  return function (dispatch: TAppDispatch) {
    dispatch({
      type: FORGOT_PASSWORD_REQUEST
    });
    forgotPasswordRequest(form)
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: FORGOT_PASSWORD_SUCCESS
          });
        } else {
          dispatch({
            type: FORGOT_PASSWORD_FAILED
          });
        }
      })
      .catch(err => {
        dispatch({
          type: FORGOT_PASSWORD_FAILED
        });
      })
  };
}

export const resetPassword: TAppThunk = (form: HTMLFormElement) => (dispatch: TAppDispatch) => {
  return function (dispatch: TAppDispatch) {
    dispatch({
      type: RESET_PASSWORD_REQUEST
    });
    resetPasswordRequest(form)
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: RESET_PASSWORD_SUCCESS,
            user: {
              password: form.password
            }
          });
        } else {
          dispatch({
            type: RESET_PASSWORD_FAILED
          });
        }
      })
      .catch(err => {
        dispatch({
          type: RESET_PASSWORD_FAILED
        });
      })
  };
}

export const getProfile: TAppThunk = (form: HTMLFormElement) => (dispatch: TAppDispatch) => {
  return function (dispatch: TAppDispatch) {
    dispatch({
      type: GET_PROFILE_REQUEST
    });
    getProfileRequest()
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: GET_PROFILE_SUCCESS,
            user: {
              email: res.user.email,
              name: res.user.name
            }
          });
        } else {
          dispatch({
            type: GET_PROFILE_FAILED
          });
        }
      })
      .catch(err => {
        dispatch({
          type: GET_PROFILE_FAILED
        });
      })
  };
}

export const editProfile: TAppThunk = (form: HTMLFormElement) => (dispatch: TAppDispatch) => {
  return function (dispatch: TAppDispatch) {
    dispatch({
      type: EDIT_PROFILE_REQUEST
    });
    editProfileRequest(form)
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: EDIT_PROFILE_SUCCESS,
            user: {
              email: res.user.email,
              name: res.user.name,
              password: form.password
            }
          });
        } else {
          dispatch({
            type: EDIT_PROFILE_FAILED
          });
        }
      })
      .catch(err => {
        dispatch({
          type: EDIT_PROFILE_FAILED
        });
      })
  };
}