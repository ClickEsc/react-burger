import { ERROR_RES_STATUS } from "../utils/constants";
import { IIngredient } from "../utils/types";

export const API_BASE_URL: string = 'https://norma.nomoreparties.space/api';

export const checkRes = (res: Response) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(new Error(`${ERROR_RES_STATUS} ${res.status}`));
}

export const getIngredients = async () => {
  return fetch(`${API_BASE_URL}/ingredients`)
    .then(checkRes)
}

export const getOrderNumber = async (ingredientsIdsArr: string[]) => {
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
    .then(checkRes)
}
