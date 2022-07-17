import { combineReducers } from 'redux';
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  GET_CONSTRUCTOR_INGREDIENTS_REQUEST,
  GET_CONSTRUCTOR_INGREDIENTS_SUCCESS,
  GET_CONSTRUCTOR_INGREDIENTS_FAILED,
  INCREASE_ITEM,
  DECREASE_ITEM,
  GET_ORDER_NUMBER_SUCCESS,
  DEFINE_CURRENT_INGREDIENT,
  REORGANIZE_ITEMS,
  RESET_ORDER,
  TAB_SWITCH,
  GET_ORDER_NUMBER_FAILED,
  GET_ORDER_NUMBER_REQUEST,
  INGREDIENT_MODAL_VISIBLE,
  TAppActions
} from '../actions/index';
import { authReducer } from './auth';
import { wsReducer } from './wsReducer';
import { IIngredient } from '../../utils/types';

type TCurrentOrder = {
  burger: ReadonlyArray<IIngredient>;
  totalPrice: number;
  orderId: number;
  orderNumberFailed: boolean;
  orderNumberRequest: boolean;
}

export type TAppState = {
  ingredientsList: Array<IIngredient>,
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
  constructorIngredientsRequest: boolean;
  constructorIngredientsFailed: boolean;
  currentIngredient: IIngredient | null;
  isIngredientModalVisible: boolean;
  currentOrder: TCurrentOrder;
  currentTab: string;
};

export const initialState: TAppState = {
  ingredientsList: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
  constructorIngredientsRequest: false,
  constructorIngredientsFailed: false,
  currentIngredient: null,
  isIngredientModalVisible: false,
  currentOrder: {
    burger: [],
    totalPrice: 0,
    orderId: 0,
    orderNumberFailed: false,
    orderNumberRequest: false
  },
  currentTab: 'bun',
};

export const ingredientsReducer = (state = initialState, action: TAppActions): TAppState => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: false,
        ingredientsList: action.ingredientsList,
        currentOrder: {
          ...state.currentOrder,
          burger: action.burger.map((item: IIngredient) => {
            return item
          })
        }
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsFailed: true,
        ingredientsRequest: false
      };
    }
    case GET_CONSTRUCTOR_INGREDIENTS_REQUEST: {
      return {
        ...state,
        constructorIngredientsRequest: true
      };
    }
    case GET_CONSTRUCTOR_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        constructorIngredientsRequest: false,
        constructorIngredientsFailed: false,
        // ingredientsList: [...state.ingredientsList].map((item: IIngredient) => item.__v = 0),
        currentOrder: {
          ...state.currentOrder,
          burger: action.burger
        }
      };
    }
    case GET_CONSTRUCTOR_INGREDIENTS_FAILED: {
      return {
        ...state,
        constructorIngredientsFailed: true,
        constructorIngredientsRequest: false
      };
    }
    case INCREASE_ITEM: {
      let tempArr = [...state.currentOrder.burger];

      const newItem: IIngredient | undefined = [...state.ingredientsList].find((item: IIngredient) => {
        if (item._id === action.item._id) {
          if (action.item.type === 'bun') {
            const oldBun = [...state.currentOrder.burger].find((item: IIngredient) => item.type === 'bun');
            if (oldBun) {
              tempArr = [...state.currentOrder.burger].filter((item: IIngredient) => item.type !== 'bun')
            }
          }
          return item
        }
      });

      const objClone = newItem && { ...newItem };
      const objNew = !!objClone && Object.assign(objClone, { __v: 1, uuid: action.uuid });

      !!objNew && tempArr.push(objNew)

      return {
        ...state,
        ingredientsList: [...state.ingredientsList].map((item: IIngredient) => {
          if (item._id === action.item._id) {
            if (item.type === 'bun') {
              state.ingredientsList.filter((item: IIngredient) => item.type === 'bun').map((item: IIngredient) => item.__v = 0);
            }
            return { ...item, __v: ++item.__v }
          } else {
            return item
          }
        }),
        currentOrder: {
          ...state.currentOrder,
          burger: tempArr
        }
      };
    }
    case DECREASE_ITEM: {
      return {
        ...state,
        ingredientsList: [...state.ingredientsList].map((item: IIngredient) =>
          item._id === action.id ? { ...item, __v: --item.__v } : item
        ),
        currentOrder: {
          ...state.currentOrder,
          burger: [...state.currentOrder.burger].filter((item: IIngredient) => {
            if (item.uuid !== action.uuid) {
              return item
            }
          })
        }
      }
    }
    case GET_ORDER_NUMBER_REQUEST: {
      return {
        ...state,
        currentOrder: {
          ...state.currentOrder,
          orderNumberRequest: true
        }
      }
    }
    case GET_ORDER_NUMBER_SUCCESS: {
      return {
        ...state,
        currentOrder: {
          ...state.currentOrder,
          orderNumberRequest: false,
          orderNumberFailed: false,
          orderId: action.orderId
        }
      }
    }
    case GET_ORDER_NUMBER_FAILED: {
      return {
        ...state,
        currentOrder: {
          ...state.currentOrder,
          orderNumberFailed: true,
          orderNumberRequest: false
        }
      }
    }
    case REORGANIZE_ITEMS: { 
      const bun = [...state.currentOrder.burger].filter((item: IIngredient) => item.type === 'bun');
      return {
        ...state,
        currentOrder: {
          ...state.currentOrder,
          burger: [...bun, ...action.newBurgerState]
        }
      }
    }
    case DEFINE_CURRENT_INGREDIENT: {
      return {
        ...state,
        currentIngredient: action.ingredient
      }
    }
    case RESET_ORDER: {
      return {
        ...state,
        ingredientsList: [...state.ingredientsList].map((item: IIngredient) => {
          return { ...item, __v: 0 }
        }),
        currentOrder: {
          ...state.currentOrder,
          burger: []
        }
      }
    }
    case TAB_SWITCH: {
      return {
        ...state,
        currentTab: action.tabType
      };
    }
    case INGREDIENT_MODAL_VISIBLE: {
      return {
        ...state,
        isIngredientModalVisible: action.value
      };
    }
    default: {
      return state;
    }
  }
};

export const rootReducer = combineReducers({
  app: ingredientsReducer,
  auth: authReducer,
  ws: wsReducer
}) 