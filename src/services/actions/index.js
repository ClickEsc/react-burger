import { getIngredients } from "../../api/api";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const GET_CONSTRUCTOR_INGREDIENTS_REQUEST = 'GET_CONSTRUCTOR_INGREDIENTS_REQUEST';
export const GET_CONSTRUCTOR_INGREDIENTS_SUCCESS = 'GET_CONSTRUCTOR_INGREDIENTS_SUCCESS';
export const GET_CONSTRUCTOR_INGREDIENTS_FAILED = 'GET_CONSTRUCTOR_INGREDIENTS_FAILED';

export const INCREASE_ITEM = 'INCREASE_ITEM';
export const DECREASE_ITEM = 'DECREASE_ITEM';

export const REORGANIZE_ITEMS = 'REORGANIZE_ITEMS';

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
            burger: []
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

export function getConstructorIngredients() {
  return function(dispatch) {
    dispatch({
      type: GET_CONSTRUCTOR_INGREDIENTS_REQUEST
    });
    getIngredients()
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: GET_CONSTRUCTOR_INGREDIENTS_SUCCESS,
            burger: res.data
          });
        } else {
          dispatch({
            type: GET_CONSTRUCTOR_INGREDIENTS_FAILED
          });
        }
      })
      .catch(err => {
        dispatch({
          type: GET_CONSTRUCTOR_INGREDIENTS_FAILED
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