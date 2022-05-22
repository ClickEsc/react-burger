import {
  signupRequest,
  loginRequest,
  forgotPasswordRequest,
  resetPasswordRequest,
  editProfileRequest
} from "../../api/auth";

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILED = 'SIGNUP_FAILED';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED';

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';

export const EDIT_PROFILE_REQUEST = 'EDIT_PROFILE_REQUEST';
export const EDIT_PROFILE_SUCCESS = 'EDIT_PROFILE_SUCCESS';
export const EDIT_PROFILE_FAILED = 'EDIT_PROFILE_FAILED';

export function signup(form) {
  return function (dispatch) {
    dispatch({
      type: SIGNUP_REQUEST
    });
    signupRequest(form)
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: SIGNUP_SUCCESS,
            user: res.user
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

export function login(form) {
  return function (dispatch) {
    dispatch({
      type: LOGIN_REQUEST
    });
    loginRequest(form)
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: LOGIN_SUCCESS,
            user: {
              email: res.user.email,
              name: res.user.name,
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

export function forgotPassword(form) {
  return function (dispatch) {
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

export function resetPassword(form) {
  return function (dispatch) {
    dispatch({
      type: RESET_PASSWORD_REQUEST
    });
    resetPasswordRequest(form)
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: RESET_PASSWORD_SUCCESS,
            password: form.password
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

export function editProfile(form) {
  return function (dispatch) {
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