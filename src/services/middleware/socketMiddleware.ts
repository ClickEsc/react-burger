import { Middleware, MiddlewareAPI } from 'redux';
import { TAppDispatch, TRootState } from '../types';
import { IWsActions } from '../actions/wsActions';

export const socketMiddleware = (wsUrl: string, wsActions: IWsActions): Middleware => {
    return (store: MiddlewareAPI<TAppDispatch, TRootState>) => {
    let socket: WebSocket | null = null;

    return next => action => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;

      if (type === wsInit) {
        // socket = new WebSocket(`${wsUrl}${payload}`);
        socket = new WebSocket(`wss://norma.nomoreparties.space/orders/all`);
      }
      if (socket) {
        socket.onopen = event => {
          console.log('Соединение установлено');
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({ type: onMessage, payload: restParsedData });
        };

        socket.onclose = event => {
          dispatch({ type: onClose, payload: event });
        };

        if (type === wsSendMessage) {
          const message = { ...payload };
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
  };
};