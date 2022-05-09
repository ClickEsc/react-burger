import { combineReducers } from 'redux';
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  TAB_SWITCH
} from '../actions/index';

const initialState = {
  ingredientsList: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
  ingredientsConstructorList: [],
  currentIngredient: {},
  currentOrder: {},
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
        ingredientsList: action.ingredientsList
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsFailed: true,
        itemsRequest: false
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