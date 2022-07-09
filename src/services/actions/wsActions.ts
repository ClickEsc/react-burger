import { IOrders } from "../../utils/types";

export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_CLOSE: 'WS_CONNECTION_CLOSE' = 'WS_CONNECTION_CLOSE';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';
export const WS_SEND_MESSAGE: 'WS_SEND_MESSAGE' = 'WS_SEND_MESSAGE';

export const wsActions = {
  wsInit: WS_CONNECTION_START,
  wsClose: WS_CONNECTION_CLOSE,
  wsSendMessage: WS_SEND_MESSAGE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE
};

export interface IWsActions {
  wsInit: typeof WS_CONNECTION_START;
  wsClose: typeof WS_CONNECTION_CLOSE;
  wsSendMessage: typeof WS_SEND_MESSAGE;
  onOpen: typeof WS_CONNECTION_SUCCESS;
  onClose: typeof WS_CONNECTION_CLOSED;
  onError: typeof WS_CONNECTION_ERROR;
  onMessage: typeof WS_GET_MESSAGE;
}

export interface IWsConnectionStartAction {
  readonly type: typeof WS_CONNECTION_START;
  readonly payload: string;
}

export interface IWsConnectionCloseAction {
  readonly type: typeof WS_CONNECTION_CLOSE;
}

export interface IWsSendMessageAction {
  readonly type: typeof WS_SEND_MESSAGE;
  payload: IOrders
}

export interface IWsConnectionSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IWsConnectionClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IWsConnectionErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR;
}

export interface IWsGetMessageAction {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: IOrders;
}

export type TWsActions =
  | IWsConnectionStartAction
  | IWsConnectionCloseAction
  | IWsSendMessageAction
  | IWsConnectionSuccessAction
  | IWsConnectionClosedAction
  | IWsConnectionErrorAction
  | IWsGetMessageAction;



export const wsConnectionStart = (payload: string): IWsConnectionStartAction => {
  return {
    type: WS_CONNECTION_START,
    payload
  };
};

export const wsConnectionClose = (): IWsConnectionCloseAction => {
  return {
    type: WS_CONNECTION_CLOSE
  };
};

export const wsSendMessage = (message: IOrders): IWsSendMessageAction => {
  return {
    type: WS_SEND_MESSAGE,
    payload: message
  };
};

export const wsConnectionSuccess = (): IWsConnectionSuccessAction => {
  return {
    type: WS_CONNECTION_SUCCESS
  };
};

export const wsConnectionClosed = (): IWsConnectionClosedAction => {
  return {
    type: WS_CONNECTION_CLOSED
  };
};

export const wsConnectionError = (): IWsConnectionErrorAction => {
  return {
    type: WS_CONNECTION_ERROR
  };
};

export const wsGetMessage = (message: IOrders): IWsGetMessageAction => {
  return {
    type: WS_GET_MESSAGE,
    payload: message
  };
};