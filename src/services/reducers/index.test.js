import { initialState, ingredientsReducer } from './index';
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  GET_CONSTRUCTOR_INGREDIENTS_REQUEST,
  GET_CONSTRUCTOR_INGREDIENTS_SUCCESS,
  GET_CONSTRUCTOR_INGREDIENTS_FAILED,
  INCREASE_ITEM,
  DECREASE_ITEM,
  GET_ORDER_NUMBER_REQUEST,
  GET_ORDER_NUMBER_SUCCESS,
  GET_ORDER_NUMBER_FAILED,
  REORGANIZE_ITEMS,
  DEFINE_CURRENT_INGREDIENT,
  RESET_ORDER,
  TAB_SWITCH,
  INGREDIENT_MODAL_VISIBLE,
} from '../actions';
import { ingredientMock, orderMock, tabTypeMock, uuidMock } from '../../utils/mocks';

describe('ingredients reducer', () => {
  it('should return the initial state', () => {
    expect(ingredientsReducer(undefined, {})).toEqual(initialState)
  })

  it('should handle GET_INGREDIENTS_REQUEST', () => {
    expect(ingredientsReducer(initialState, { type: GET_INGREDIENTS_REQUEST })).toEqual(
      {
        ...initialState,
        ingredientsRequest: true
      }
    )
  })

  it('should handle GET_INGREDIENTS_SUCCESS', () => {
    const action = {
      type: GET_INGREDIENTS_SUCCESS,
      ingredientsList: [ingredientMock],
      burger: [ingredientMock]
    }
    expect(ingredientsReducer(initialState, action)).toEqual(
      {
        ...initialState,
        ingredientsRequest: false,
        ingredientsFailed: false,
        ingredientsList: action.ingredientsList,
        currentOrder: {
          ...initialState.currentOrder,
          burger: action.burger.map((item) => {
            return item
          })
        }
      }
    )
  })

  it('should handle GET_INGREDIENTS_FAILED', () => {
    expect(ingredientsReducer(initialState, { type: GET_INGREDIENTS_FAILED })).toEqual(
      {
        ...initialState,
        ingredientsFailed: true,
        ingredientsRequest: false
      }
    )
  })

  it('should handle GET_CONSTRUCTOR_INGREDIENTS_REQUEST', () => {
    expect(ingredientsReducer(initialState, { type: GET_CONSTRUCTOR_INGREDIENTS_REQUEST })).toEqual(
      {
        ...initialState,
        constructorIngredientsRequest: true
      }
    )
  })

  it('should handle GET_CONSTRUCTOR_INGREDIENTS_SUCCESS', () => {
    const action = {
      type: GET_CONSTRUCTOR_INGREDIENTS_SUCCESS,
      burger: [ingredientMock]
    }
    expect(ingredientsReducer(initialState, action)).toEqual(
      {
        ...initialState,
        constructorIngredientsRequest: false,
        constructorIngredientsFailed: false,
        currentOrder: {
          ...initialState.currentOrder,
          burger: action.burger
        }
      }
    )
  })

  it('should handle GET_CONSTRUCTOR_INGREDIENTS_FAILED', () => {
    expect(ingredientsReducer(initialState, { type: GET_CONSTRUCTOR_INGREDIENTS_FAILED })).toEqual(
      {
        ...initialState,
        constructorIngredientsFailed: true,
        constructorIngredientsRequest: false
      }
    )
  })

  it('should handle INCREASE_ITEM', () => {
    const action = {
      type: INCREASE_ITEM,
      item: ingredientMock
    }

    let tempArr = [...initialState.currentOrder.burger];

    const newItem = [...initialState.ingredientsList].find((item) => {
      if (item._id === action.item._id) {
        if (action.item.type === 'bun') {
          const oldBun = [...initialState.currentOrder.burger].find((item) => item.type === 'bun');
          if (oldBun) {
            tempArr = [...initialState.currentOrder.burger].filter((item) => item.type !== 'bun')
          }
        }
        return item
      }
    });

    const objClone = newItem && { ...newItem };
    const objNew = !!objClone && Object.assign(objClone, { __v: 1, uuid: action.uuid });

    !!objNew && tempArr.push(objNew)

    expect(ingredientsReducer(initialState, action)).toEqual(
      {
        ...initialState,
        ingredientsList: [...initialState.ingredientsList].map((item) => {
          if (item._id === action.item._id) {
            if (item.type === 'bun') {
              initialState.ingredientsList.filter((item) => item.type === 'bun').map((item) => item.__v = 0);
            }
            return { ...item, __v: ++item.__v }
          } else {
            return item
          }
        }),
        currentOrder: {
          ...initialState.currentOrder,
          burger: tempArr
        }
      }
    )
  })

  it('should handle DECREASE_ITEM', () => {
    const action = {
      type: INCREASE_ITEM,
      id: ingredientMock._id,
      uuid: uuidMock
    }
    expect(ingredientsReducer(initialState, { type: DECREASE_ITEM })).toEqual(
      {
        ...initialState,
        ingredientsList: [...initialState.ingredientsList].map((item) =>
          item._id === action.id ? { ...item, __v: --item.__v } : item
        ),
        currentOrder: {
          ...initialState.currentOrder,
          burger: [...initialState.currentOrder.burger].filter((item) => {
            if (item.uuid !== action.uuid) {
              return item
            }
          })
        }
      }
    )
  })

  it('should handle GET_ORDER_NUMBER_REQUEST', () => {
    expect(ingredientsReducer(initialState, { type: GET_ORDER_NUMBER_REQUEST })).toEqual(
      {
        ...initialState,
        currentOrder: {
          ...initialState.currentOrder,
          orderNumberRequest: true
        }
      }
    )
  })

  it('should handle GET_GET_ORDER_NUMBER_SUCCESS', () => {
    const action = {
      type: GET_ORDER_NUMBER_SUCCESS,
      orderId: orderMock.number
    }
    expect(ingredientsReducer(initialState, action)).toEqual(
      {
        ...initialState,
        currentOrder: {
          ...initialState.currentOrder,
          orderNumberRequest: false,
          orderNumberFailed: false,
          orderId: action.orderId
        }
      }
    )
  })

  it('should handle GET_ORDER_NUMBER_FAILED', () => {
    expect(ingredientsReducer(initialState, { type: GET_ORDER_NUMBER_FAILED })).toEqual(
      {
        ...initialState,
        currentOrder: {
          ...initialState.currentOrder,
          orderNumberFailed: true,
          orderNumberRequest: false
        }
      }
    )
  })

  it('should handle REORGANIZE_ITEMS', () => {
    const action = {
      type: REORGANIZE_ITEMS,
      newBurgerState: [ingredientMock]
    }
    const bun = [...initialState.currentOrder.burger].filter((item) => item.type === 'bun');
    expect(ingredientsReducer(initialState, action)).toEqual(
      {
        ...initialState,
        currentOrder: {
          ...initialState.currentOrder,
          burger: [...bun, ...action.newBurgerState]
        }
      }
    )
  })

  it('should handle DEFINE_CURRENT_INGREDIENT', () => {
    const action = {
      type: DEFINE_CURRENT_INGREDIENT,
      ingredient: {...ingredientMock}
    }
    expect(ingredientsReducer(initialState, action)).toEqual(
      {
        ...initialState,
        currentIngredient: action.ingredient
      }
    )
  })

  it('should handle RESET_ORDER', () => {
    expect(ingredientsReducer(initialState, { type: RESET_ORDER })).toEqual(
      {
        ...initialState,
        ingredientsList: [...initialState.ingredientsList].map((item) => {
          return { ...item, __v: 0 }
        }),
        currentOrder: {
          ...initialState.currentOrder,
          burger: []
        }
      }
    )
  })

  it('should handle TAB_SWITCH', () => {
    const action = {
      type: TAB_SWITCH,
      tabType: tabTypeMock
    }
    expect(ingredientsReducer(initialState, action)).toEqual(
      {
        ...initialState,
        currentTab: action.tabType
      }
    )
  })

  it('should handle INGREDIENT_MODAL_VISIBLE', () => {
    const action = {
      type: INGREDIENT_MODAL_VISIBLE,
      value: true
    }
    expect(ingredientsReducer(initialState, action)).toEqual(
      {
        ...initialState,
        isIngredientModalVisible: action.value
      }
    )
  })
})