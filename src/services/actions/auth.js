import { signupRequest, loginRequest } from "../../api/auth";

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILED = 'SIGNUP_FAILED';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

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
        console.log(res)
        if (res) {
          dispatch({
            type: LOGIN_SUCCESS,
            user: res.user
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