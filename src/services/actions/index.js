import { getIngredients } from "../../api/api";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const INCREASE_ITEM = 'INCREASE_ITEM';
export const DECREASE_ITEM = 'DECREASE_ITEM'
export const DELETE_ITEM = 'DELETE_ITEM';

export const TAB_SWITCH = 'TAB_SWITCH';

export function getBurgerIngredients() {
  return function(dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    });
    getIngredients()
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: GET_INGREDIENTS_SUCCESS,
            ingredientsList: res.data,
            constructorIngredientsList: res.data
          });
        } else {
          dispatch({
            type: GET_INGREDIENTS_FAILED
          });
        }
      })
      .catch(err => {
        dispatch({
          type: GET_INGREDIENTS_FAILED
        });
      })
  };
}

export function switchTab(tabType) {
  return function(dispatch) {
    dispatch({
      type: TAB_SWITCH,
      tabType
    });
  }
}