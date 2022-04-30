import { ERROR_RES_STATUS } from "../utils/constants";

export const API_BASE_URL = 'https://norma.nomoreparties.space/api';

const checkRes = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(new Error(`${ERROR_RES_STATUS}: ${res.error}`));
}

// Получить список ингредиентов
export const getIngredients = async () => {
  return fetch(`${API_BASE_URL}/ingredients`)
    .then(res => checkRes(res))
}

// Получить номер заказа
export const getOrderNumber = async (ingredientsIdsArr) => {
  return fetch(`${API_BASE_URL}/orders`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({
      "ingredients": ingredientsIdsArr
    })
  })
    .then(res => checkRes(res))
}
