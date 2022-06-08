import { deleteCookie, getCookie, setCookie } from "../services/utils";
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
  return fetch(`${AUTH_URL}/login`, {
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
        if (accessToken) {
          setCookie('accessToken', accessToken, { expires: 1200 });
        }
      } if (res.refreshToken) {
        setCookie('refreshToken', res.refreshToken);
      }
      return res
    })
}

export const logoutRequest = async () => {
  const token = getCookie('refreshToken');
  return fetch(`${AUTH_URL}/logout`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({ token })
  })
    .then(checkRes)
    .then(res => {
      deleteCookie('accessToken');
      deleteCookie('refreshToken');
      return res
    })
}

export const refreshTokenRequest = async (token) => {
  return await fetch(`${AUTH_URL}/token`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({ token })
  })
    .then(res => {
      if (res.accessToken) {
        const accessToken = res.accessToken.split('Bearer ')[1];
        if (accessToken) {
          setCookie('accessToken', accessToken, { expires: 1200 });
        }
      } if (res.refreshToken) {
        setCookie('refreshToken', res.refreshToken);
      }
      return res
    })
    .then(checkRes)
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

export const getProfileRequest = async () => {
  return await fetch(`${AUTH_URL}/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('accessToken')
    }
  })
  .then(checkRes)
  // .then((res) => {
  //   try {
  //     if (res.success) {
  //       return res
  //     }
  //     if (res.status === 403) {
  //       return res.json();
  //     }
  //   } catch (err) {
  //     return (err)
  //   }
  // })
  // .then((res) => {
  //   if (res.message === "jwt malformed") {
  //     const refreshToken = getCookie('refreshToken');
  //     refreshTokenRequest(refreshToken);
  //   }
  // })
}

export const editProfileRequest = async (form) => {
  return await fetch(`${AUTH_URL}/user`, {
    method: 'PATCH',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('accessToken')
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(form)
  })
    .then(checkRes)
}