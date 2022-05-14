import { combineReducers } from 'redux';
import { v4 as uuidv4 } from 'uuid';
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
} from '../actions/index';

const initialState = {
  ingredientsList: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
  constructorIngredientsRequest: false,
  constructorIngredientsFailed: false,
  currentIngredient: null,
  currentOrder: {
    burger: [],
    totalPrice: 0,
    orderId: 0,
    orderNumberFailed: false,
    orderNumberRequest: false
  },
  currentTab: 'bun',
};

export const ingredientsReducer = (state = initialState, action) => {
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
          burger: action.burger.map(item => {
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
        ingredientsList: [...state.ingredientsList].map(item => item.__v = 0),
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

      const newItem = [...state.ingredientsList].find(item => {
        if (item._id === action.item._id) {
          if (action.item.type === 'bun') {
            const oldBun = [...state.currentOrder.burger].find(item => item.type === 'bun');
            if (oldBun) {
              tempArr = [...state.currentOrder.burger].filter(item => item.type !== 'bun')
            }
          }
          return item
        }
      });

      tempArr.push(newItem)

      return {
        ...state,
        ingredientsList: [...state.ingredientsList].map(item => {
          if (item._id === action.item._id) {
            if (item.type === 'bun') {
              state.ingredientsList.filter(item => item.type === 'bun').map(item => item.__v = 0);
            }
            return { ...item, __v: ++item.__v }
          } else {
            return item
          }
        }),
        currentOrder: {
          ...state.currentOrder,
          burger: tempArr.map((item, index) => {
            const objClone = { ...item };
            const objNew = Object.assign(objClone, { __v: 1, uuid: uuidv4() });
            return objNew
          })
        }
      };
    }
    case DECREASE_ITEM: {
      return {
        ...state,
        ingredientsList: [...state.ingredientsList].map(item =>
          item._id === action.id ? { ...item, __v: --item.__v } : item
        ),
        currentOrder: {
          ...state.currentOrder,
          burger: [...state.currentOrder.burger].filter(item => {
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
      const bun = [...state.currentOrder.burger].filter(item => item.type === 'bun');
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
        ingredientsList: [...state.ingredientsList].map(item => {
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
    default: {
      return state;
    }
  }
};

export const rootReducer = combineReducers({
  app: ingredientsReducer
}) 