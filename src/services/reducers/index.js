import uuid from 'react-uuid';
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
  REORGANIZE_ITEMS,
  TAB_SWITCH
} from '../actions/index';

const initialState = {
  ingredientsList: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
  currentIngredient: {},
  currentOrder: {
    burger: [],
    totalPrice: 0,
    orderId: 0
  },
  currentTab: 'bun'
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
            return { ...item, key: uuid() }
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
    case INCREASE_ITEM: {
      // const newItem = [...state.ingredientsList].find(item => item._id === action.id);
      // state.currentOrder.burger.push({ ...newItem, key: uuid() })
      return {
        ...state,
        ingredientsList: [...state.ingredientsList].map(item => {
          if (item._id === action.id) {
            if (item.type === 'bun') {
              state.ingredientsList.filter(item => item.type === 'bun').map(item => item.__v = 0);
            }
            return { ...item, __v: ++item.__v, key: uuid() }
          } else {
            return item
          }
        }),
        currentOrder: {
          ...state.currentOrder,
          burger: [...state.currentOrder.burger].map((item, index) => {
            if (item._id === action.id) {
              if (item.type === 'bun') {
                state.currentOrder.burger.filter(item => item.type === 'bun').map(item => item.__v = 0);;
              }
              return { ...item, __v: ++item.__v, key: uuid(), order: index}
            }  else {
              return item
            }
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
          burger: [...state.currentOrder.burger].map(item =>
            item._id === action.id ? { ...item, __v: --item.__v } : item
          )
        }
      }
    }
    case GET_ORDER_NUMBER_SUCCESS: {
      return {
        ...state,
        currentOrder: {
          ...state.currentOrder,
          orderId: action.orderId
        }
      }
    }
    case REORGANIZE_ITEMS: {
      return {
        ...state,
        currentOrder: {
          ...state.currentOrder,
          burger: action.newBurgerState
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