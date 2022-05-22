import { getCookie, setCookie } from "../services/utils";
import { API_BASE_URL, checkRes } from "./api"

const AUTH_URL = `${API_BASE_URL}/auth`;

export const signupRequest = async (form) => {
  return await fetch(`${AUTH_URL}/register`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(form)
  })
    .then(checkRes)
}

export const loginRequest = async (form) => {
  return await fetch(`${AUTH_URL}/login`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(form)
  })
    .then(checkRes)
    .then(res => {
      if (res.accessToken) {
        const accessToken = res.accessToken.split('Bearer ')[1];
        console.log(accessToken)
        if (accessToken) {
          setCookie('token', accessToken);
        }
      }
      return res
    })
}

export const forgotPasswordRequest = async (form) => {
  return await fetch(`${API_BASE_URL}/password-reset`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(form)
  })
    .then(checkRes)
}

export const resetPasswordRequest = async (form) => {
  return await fetch(`${API_BASE_URL}/password-reset/reset`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(form)
  })
    .then(checkRes)
}

export const editProfileRequest = async (form) => {
  return await fetch(`${AUTH_URL}/user`, {
    method: 'PATCH',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('token')
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(form)
  })
    .then(checkRes)
}