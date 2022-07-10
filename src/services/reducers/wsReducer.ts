import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_CLOSE,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE
} from '../actions/wsActions';
import { TWsActions } from '../actions/wsActions';
import { IOrders } from '../../utils/types';

type TWsState = {
  wsConnected: boolean;
  messages: IOrders;
}

const initialState: TWsState = {
  wsConnected: false,
  messages: {
    success: false,
    orders: [],
    total: 0,
    totalToday: 0,
  }
};

export const wsReducer = (state = initialState, action: TWsActions): TWsState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true
      };
      case WS_CONNECTION_CLOSE:
        return {
          ...state,
          wsConnected: false
        };
    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false
      };
    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false
      };
    case WS_GET_MESSAGE:
      return {
        ...state,
        messages: action.payload
      }
    default:
      return state;
  }
};