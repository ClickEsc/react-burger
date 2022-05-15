import { getIngredients, getOrderNumber } from "../../api/api";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const GET_CONSTRUCTOR_INGREDIENTS_REQUEST = 'GET_CONSTRUCTOR_INGREDIENTS_REQUEST';
export const GET_CONSTRUCTOR_INGREDIENTS_SUCCESS = 'GET_CONSTRUCTOR_INGREDIENTS_SUCCESS';
export const GET_CONSTRUCTOR_INGREDIENTS_FAILED = 'GET_CONSTRUCTOR_INGREDIENTS_FAILED';

export const INCREASE_ITEM = 'INCREASE_ITEM';
export const DECREASE_ITEM = 'DECREASE_ITEM';

export const GET_ORDER_NUMBER_REQUEST = 'GET_ORDER_NUMBER_REQUEST';
export const GET_ORDER_NUMBER_SUCCESS = 'GET_ORDER_NUMBER_SUCCESS';
export const GET_ORDER_NUMBER_FAILED = 'GET_ORDER_NUMBER_FAILED';

export const RESET_ORDER = 'RESET_ORDER';

export const REORGANIZE_ITEMS = 'REORGANIZE_ITEMS';
export const DEFINE_CURRENT_INGREDIENT = 'DEFINE_CURRENT_INGREDIENT';

export const TAB_SWITCH = 'TAB_SWITCH';

export function getBurgerIngredients() {
  return function (dispatch) {
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

export function getCurrentOrderNumber(orderItemsIds, ingredientsList) {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_NUMBER_REQUEST
    });
    getOrderNumber(orderItemsIds)
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: GET_ORDER_NUMBER_SUCCESS,
            orderId: res.order.number
          });
        } else {
          dispatch({
            type: GET_ORDER_NUMBER_FAILED
          });
        }
      })
      .finally(res => {
        dispatch({
          type: RESET_ORDER,
          ingredientsList,
          burger: []
        });
      })
      .catch(err => {
        dispatch({
          type: GET_ORDER_NUMBER_FAILED
        });
      })
  };
}

export function increaseItem(item, uuid) {
  return {
    type: INCREASE_ITEM,
    item,
    uuid
  }
}

export function decreaseItem(id, uuid) {
  return {
    type: DECREASE_ITEM,
    id,
    uuid
  }
}

export function switchTab(tabType) {
  return {
    type: TAB_SWITCH,
    tabType
  }
}

export function reorganizeItems(newBurgerState) {
  return {
    type: REORGANIZE_ITEMS,
    newBurgerState
  }
}

export function defineCurrentIngredient(ingredient) {
  return {
    type: DEFINE_CURRENT_INGREDIENT,
    ingredient
  }
}