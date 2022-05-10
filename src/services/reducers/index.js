import { combineReducers } from 'redux';
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  INCREASE_ITEM,
  DECREASE_ITEM,
  DELETE_ITEM,
  TAB_SWITCH
} from '../actions/index';

const initialState = {
  ingredientsList: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
  constructorIngredientsList: [],
  currentIngredient: {},
  currentOrder: {
    totalPrice: 0
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
        constructorIngredientsList: action.constructorIngredientsList
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsFailed: true,
        itemsRequest: false
      };
    }
    case INCREASE_ITEM: {
      return {
        ...state,
        constructorIngredientsList: [...state.constructorIngredientsList].map(item => {
          if (item._id === action._id) {
            if (item.type === 'bun') {
              state.constructorIngredientsList.filter(item => item.type === 'bun').map(item => item.__v = 0);
            }
            return { ...item, __v: ++item.__v }
          } else {
            return item
          }
        })
      };
    }
    case DECREASE_ITEM: {
      return {
        ...state,
        constructorIngredientsList: [...state.constructorIngredientsList].map(item =>
          item._id === action._id ? { ...item, __v: --item.__v } : item
        )
      };
    }
    case DELETE_ITEM: {
      return {
        ...state,
        constructorIngredientsList: [...state.constructorIngredientsList].filter(item => item._id !== action._id)
      };
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