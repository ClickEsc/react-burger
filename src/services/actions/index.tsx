import { getIngredients, getOrderNumber } from "../../api/api";
import { IIngredient } from "../../utils/types";

export const GET_INGREDIENTS_REQUEST: string = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS: string = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED: string = 'GET_INGREDIENTS_FAILED';

export const GET_CONSTRUCTOR_INGREDIENTS_REQUEST: string = 'GET_CONSTRUCTOR_INGREDIENTS_REQUEST';
export const GET_CONSTRUCTOR_INGREDIENTS_SUCCESS: string = 'GET_CONSTRUCTOR_INGREDIENTS_SUCCESS';
export const GET_CONSTRUCTOR_INGREDIENTS_FAILED: string = 'GET_CONSTRUCTOR_INGREDIENTS_FAILED';

export const INCREASE_ITEM: string = 'INCREASE_ITEM';
export const DECREASE_ITEM: string = 'DECREASE_ITEM';

export const GET_ORDER_NUMBER_REQUEST: string = 'GET_ORDER_NUMBER_REQUEST';
export const GET_ORDER_NUMBER_SUCCESS: string = 'GET_ORDER_NUMBER_SUCCESS';
export const GET_ORDER_NUMBER_FAILED: string = 'GET_ORDER_NUMBER_FAILED';

export const RESET_ORDER: string = 'RESET_ORDER';

export const REORGANIZE_ITEMS: string= 'REORGANIZE_ITEMS';
export const DEFINE_CURRENT_INGREDIENT: string = 'DEFINE_CURRENT_INGREDIENT';

export const TAB_SWITCH: string = 'TAB_SWITCH';

export const INGREDIENT_MODAL_VISIBLE: string = 'INGREDIENT_MODAL_VISIBLE';

export function getBurgerIngredients() {
  return function (dispatch: any) {
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

export function getCurrentOrderNumber(orderItemsIds: IIngredient[], /*ingredientsList: Array<IIngredient>*/) {
  return function (dispatch: any) {
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
      .finally(()=> {
        dispatch({
          type: RESET_ORDER,
          // ingredientsList,
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

export function increaseItem(item: IIngredient | unknown, uuid: string) {
  return {
    type: INCREASE_ITEM,
    item,
    uuid
  }
}

export function decreaseItem(id: string, uuid: string | undefined) {
  return {
    type: DECREASE_ITEM,
    id,
    uuid
  }
}

export function switchTab(tabType: string) {
  return {
    type: TAB_SWITCH,
    tabType
  }
}

export function reorganizeItems(newBurgerState: Array<IIngredient>) {
  return {
    type: REORGANIZE_ITEMS,
    newBurgerState
  }
}

export function defineCurrentIngredient(ingredient: IIngredient | null) {
  return {
    type: DEFINE_CURRENT_INGREDIENT,
    ingredient
  }
}

export function showIngredientModal(value: boolean) {
  return {
    type: INGREDIENT_MODAL_VISIBLE,
    value
  }
}