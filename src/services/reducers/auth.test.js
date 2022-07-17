import { initialState, authReducer } from './auth';
import {
  EDIT_PROFILE_FAILED,
  EDIT_PROFILE_REQUEST,
  EDIT_PROFILE_SUCCESS,
  FORGOT_PASSWORD_FAILED,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  GET_PROFILE_FAILED,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  LOGIN_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  RESET_PASSWORD_FAILED,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  SIGNUP_FAILED,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS
} from '../actions/auth';
import { userMock } from '../../utils/mocks';

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(authReducer(undefined, {})).toEqual(initialState)
  })

  it('should handle SIGNUP_REQUEST', () => {
    expect(authReducer(initialState, { type: SIGNUP_REQUEST })).toEqual(
      {
        ...initialState,
        signupRequest: true
      }
    )
  })

  it('should handle SIGNUP_SUCCESS', () => {
    const action = {
      type: SIGNUP_SUCCESS,
      user: userMock
    }
    expect(authReducer(initialState, action)).toEqual(
      {
        ...initialState,
        signupRequest: false,
        signupFailed: false,
        user: {
          ...initialState.user,
          name: action.user.name,
          email: action.user.email
        }
      }
    )
  })

  it('should handle SIGNUP_FAILED', () => {
    expect(authReducer(initialState, { type: SIGNUP_FAILED })).toEqual(
      {
        ...initialState,
        signupFailed: true,
        signupRequest: false
      }
    )
  })

  it('should handle LOGIN_REQUEST', () => {
    expect(authReducer(initialState, { type: LOGIN_REQUEST })).toEqual(
      {
        ...initialState,
        loginRequest: true
      }
    )
  })

  it('should handle LOGIN_SUCCESS', () => {
    const action = {
      type: LOGIN_SUCCESS,
      user: userMock
    }
    expect(authReducer(initialState, action)).toEqual(
      {
        ...initialState,
        loginRequest: false,
        loginFailed: false,
        user: {
          ...initialState.user,
          isAuthorized: true,
          password: action.user.password
        }
      }
    )
  })

  it('should handle LOGIN_FAILED', () => {
    expect(authReducer(initialState, { type: LOGIN_FAILED })).toEqual(
      {
        ...initialState,
        loginFailed: true,
        loginRequest: false
      }
    )
  })
  
  it('should handle LOGOUT_REQUEST', () => {
    expect(authReducer(initialState, { type: LOGOUT_REQUEST })).toEqual(
      {
        ...initialState,
        logoutRequest: true
      }
    )
  })

  it('should handle LOGOUT_SUCCESS', () => {
    const action = {
      type: LOGOUT_SUCCESS,
      user: userMock
    }
    expect(authReducer(initialState, action)).toEqual(
      {
        ...initialState,
        logoutRequest: false,
        logoutFailed: false,
        user: {
          ...initialState.user,
          isAuthorized: false,
        }
      }
    )
  })

  it('should handle LOGOUT_FAILED', () => {
    expect(authReducer(initialState, { type: LOGOUT_FAILED })).toEqual(
      {
        ...initialState,
        logoutFailed: true,
        logoutRequest: false
      }
    )
  })

  it('should handle FORGOT_PASSWORD_REQUEST', () => {
    expect(authReducer(initialState, { type: FORGOT_PASSWORD_REQUEST })).toEqual(
      {
        ...initialState,
        forgotPasswordRequest: true
      }
    )
  })

  it('should handle FORGOT_PASSWORD_SUCCESS', () => {
    expect(authReducer(initialState, { type: FORGOT_PASSWORD_SUCCESS })).toEqual(
      {
        ...initialState,
        forgotPasswordRequest: false,
        forgotPasswordFailed: false,
        isResetPasswordEmailSent: true
      }
    )
  })

  it('should handle FORGOT_PASSWORD_FAILED', () => {
    expect(authReducer(initialState, { type: FORGOT_PASSWORD_FAILED })).toEqual(
      {
        ...initialState,
        forgotPasswordFailed: true,
        forgotPasswordRequest: false
      }
    )
  })

  it('should handle RESET_PASSWORD_REQUEST', () => {
    expect(authReducer(initialState, { type: RESET_PASSWORD_REQUEST })).toEqual(
      {
        ...initialState,
        resetPasswordRequest: true
      }
    )
  })

  it('should handle RESET_PASSWORD_SUCCESS', () => {
    const action = {
      type: RESET_PASSWORD_SUCCESS,
      user: userMock
    }
    expect(authReducer(initialState, action)).toEqual(
      {
        ...initialState,
        resetPasswordRequest: false,
        resetPasswordFailed: false,
        user: {
          ...initialState.user,
          password: action.user.password,
        }
      }
    )
  })

  it('should handle RESET_PASSWORD_FAILED', () => {
    expect(authReducer(initialState, { type: RESET_PASSWORD_FAILED })).toEqual(
      {
        ...initialState,
        resetPasswordFailed: true,
        resetPasswordRequest: false
      }
    )
  })

  it('should handle GET_PROFILE_REQUEST', () => {
    expect(authReducer(initialState, { type: GET_PROFILE_REQUEST })).toEqual(
      {
        ...initialState,
        getProfileRequest: true
      }
    )
  })

  it('should handle GET_PROFILE_SUCCESS', () => {
    const action = {
      type: GET_PROFILE_SUCCESS,
      user: userMock
    }
    expect(authReducer(initialState, action)).toEqual(
      {
        ...initialState,
        getProfileRequest: false,
        getProfileFailed: false,
        user: {
          ...initialState.user,
          name: action.user.name,
          email: action.user.email
        }
      }
    )
  })

  it('should handle GET_PROFILE_FAILED', () => {
    expect(authReducer(initialState, { type: GET_PROFILE_FAILED })).toEqual(
      {
        ...initialState,
        getProfileFailed: true,
        getProfileRequest: false
      }
    )
  })

  it('should handle EDIT_PROFILE_REQUEST', () => {
    expect(authReducer(initialState, { type: EDIT_PROFILE_REQUEST })).toEqual(
      {
        ...initialState,
        editProfileRequest: true
      }
    )
  })

  it('should handle EDIT_PROFILE_SUCCESS', () => {
    const action = {
      type: EDIT_PROFILE_SUCCESS,
      user: userMock
    }
    expect(authReducer(initialState, action)).toEqual(
      {
        ...initialState,
        editProfileRequest: false,
        editProfileFailed: false,
        user: {
          ...initialState.user,
          name: action.user.name,
          email: action.user.email,
          password: action.user.password
        }
      }
    )
  })

  it('should handle EDIT_PROFILE_FAILED', () => {
    expect(authReducer(initialState, { type: EDIT_PROFILE_FAILED })).toEqual(
      {
        ...initialState,
        editProfileFailed: true,
        editProfileRequest: false
      }
    )
  })
})