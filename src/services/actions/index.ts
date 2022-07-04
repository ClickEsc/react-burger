import { getIngredients, getOrderNumber } from "../../api/api";
import { IIngredient } from "../../utils/types";
import { TAppDispatch, TAppThunk } from "../types";

export const GET_INGREDIENTS_REQUEST: 'GET_INGREDIENTS_REQUEST' = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED: 'GET_INGREDIENTS_FAILED' = 'GET_INGREDIENTS_FAILED';

export const GET_CONSTRUCTOR_INGREDIENTS_REQUEST: 'GET_CONSTRUCTOR_INGREDIENTS_REQUEST' = 'GET_CONSTRUCTOR_INGREDIENTS_REQUEST';
export const GET_CONSTRUCTOR_INGREDIENTS_SUCCESS: 'GET_CONSTRUCTOR_INGREDIENTS_SUCCESS' = 'GET_CONSTRUCTOR_INGREDIENTS_SUCCESS';
export const GET_CONSTRUCTOR_INGREDIENTS_FAILED: 'GET_CONSTRUCTOR_INGREDIENTS_FAILED' = 'GET_CONSTRUCTOR_INGREDIENTS_FAILED';

export const INCREASE_ITEM: 'INCREASE_ITEM' = 'INCREASE_ITEM';
export const DECREASE_ITEM: 'DECREASE_ITEM' = 'DECREASE_ITEM';

export const GET_ORDER_NUMBER_REQUEST: 'GET_ORDER_NUMBER_REQUEST' = 'GET_ORDER_NUMBER_REQUEST';
export const GET_ORDER_NUMBER_SUCCESS: 'GET_ORDER_NUMBER_SUCCESS' = 'GET_ORDER_NUMBER_SUCCESS';
export const GET_ORDER_NUMBER_FAILED: 'GET_ORDER_NUMBER_FAILED' = 'GET_ORDER_NUMBER_FAILED';

export const RESET_ORDER: 'RESET_ORDER' = 'RESET_ORDER';

export const REORGANIZE_ITEMS: 'REORGANIZE_ITEMS' = 'REORGANIZE_ITEMS';
export const DEFINE_CURRENT_INGREDIENT: 'DEFINE_CURRENT_INGREDIENT' = 'DEFINE_CURRENT_INGREDIENT';

export const TAB_SWITCH: 'TAB_SWITCH' = 'TAB_SWITCH';

export const INGREDIENT_MODAL_VISIBLE: 'INGREDIENT_MODAL_VISIBLE' = 'INGREDIENT_MODAL_VISIBLE';


// Типизация экшенов
export interface IGetIngredientsRequestAction {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  ingredientsList: Array<IIngredient>;
  readonly burger: Array<IIngredient>;
}

export interface IGetIngredientsFailedAction {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

export interface IGetConstructorIngredientsRequestAction {
  readonly type: typeof GET_CONSTRUCTOR_INGREDIENTS_REQUEST;
}

export interface IGetConstructorIngredientsSuccessAction {
  readonly type: typeof GET_CONSTRUCTOR_INGREDIENTS_SUCCESS;
  ingredientsList: Array<IIngredient>;
  readonly burger: Array<IIngredient>;
}

export interface IGetConstructorIngredientsFailedAction {
  readonly type: typeof GET_CONSTRUCTOR_INGREDIENTS_FAILED;
}

export interface IGetOrderNumberRequestAction {
  readonly type: typeof GET_ORDER_NUMBER_REQUEST;
}

export interface IGetOrderNumberSuccessAction {
  readonly type: typeof GET_ORDER_NUMBER_SUCCESS;
  readonly orderId: number;
}

export interface IGetOrderNumberFailedAction {
  readonly type: typeof GET_ORDER_NUMBER_FAILED;
}

export interface IResetOrderAction {
  readonly type: typeof RESET_ORDER;
  readonly burger: Array<IIngredient>;
}

export interface IIncreaseItemAction {
  readonly type: typeof INCREASE_ITEM;
  item: IIngredient;
  readonly uuid: string;
}

export interface IDecreaseItemAction {
  readonly type: typeof DECREASE_ITEM;
  readonly id: string;
  readonly uuid: string | undefined;
}

export interface ISwitchTabAction {
  readonly type: typeof TAB_SWITCH;
  readonly tabType: string;
}

export interface IReorganizeItemsAction {
  readonly type: typeof REORGANIZE_ITEMS;
  readonly newBurgerState: Array<IIngredient>;
}

export interface IDefineCurrentIngredientAction {
  readonly type: typeof DEFINE_CURRENT_INGREDIENT;
  readonly ingredient: IIngredient;
}

export interface IShowIngredientModalAction {
  readonly type: typeof INGREDIENT_MODAL_VISIBLE;
  readonly value: boolean;
}

export type TAppActions =
  | IGetIngredientsRequestAction
  | IGetIngredientsSuccessAction
  | IGetIngredientsFailedAction
  | IGetConstructorIngredientsRequestAction
  | IGetConstructorIngredientsSuccessAction
  | IGetConstructorIngredientsFailedAction
  | IGetOrderNumberRequestAction
  | IGetOrderNumberSuccessAction
  | IGetOrderNumberFailedAction
  | IResetOrderAction
  | IIncreaseItemAction
  | IDecreaseItemAction
  | ISwitchTabAction
  | IReorganizeItemsAction
  | IDefineCurrentIngredientAction
  | IShowIngredientModalAction;

export const getBurgerIngredients: TAppThunk = () => (dispatch: TAppDispatch) => {
  return function (dispatch: TAppDispatch) {
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

export const getCurrentOrderNumber: TAppThunk = (orderItemsIds: IIngredient[]) => (dispatch: TAppDispatch) => {
  return function (dispatch: TAppDispatch) {
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
      .finally(() => {
        dispatch({
          type: RESET_ORDER,
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

export const increaseItem = (item: IIngredient, uuid: string): IIncreaseItemAction => {
  return {
    type: INCREASE_ITEM,
    item,
    uuid
  }
}

export const decreaseItem = (id: string, uuid: string | undefined): IDecreaseItemAction => {
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