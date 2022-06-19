import {
  signupRequest,
  loginRequest,
  logoutRequest,
  forgotPasswordRequest,
  resetPasswordRequest,
  getProfileRequest,
  editProfileRequest
} from "../../api/auth";

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILED = 'SIGNUP_FAILED';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED';

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';

export const GET_PROFILE_REQUEST = 'GET_PROFILE_REQUEST';
export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';
export const GET_PROFILE_FAILED = 'GET_PROFILE_FAILED';

export const EDIT_PROFILE_REQUEST = 'EDIT_PROFILE_REQUEST';
export const EDIT_PROFILE_SUCCESS = 'EDIT_PROFILE_SUCCESS';
export const EDIT_PROFILE_FAILED = 'EDIT_PROFILE_FAILED';

export function signup(form: HTMLFormElement) {
  return function (dispatch: any) {
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

export function login(form: HTMLFormElement) {
  return function (dispatch: any) {
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

export function logout() {
  return function (dispatch: any) {
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

export function forgotPassword(form: HTMLFormElement) {
  return function (dispatch: any) {
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

export function resetPassword(form: HTMLFormElement) {
  return function (dispatch: any) {
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

export function getProfile() {
  return function (dispatch: any) {
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

export function editProfile(form: HTMLFormElement) {
  return function (dispatch: any) {
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