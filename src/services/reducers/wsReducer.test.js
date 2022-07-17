import { initialState, wsReducer } from './wsReducer';
import {
  wsConnectionClose,
  wsConnectionClosed,
  wsConnectionSuccess,
  wsGetMessage
} from '../actions/wsActions';
import { wsMessagesMock } from '../../utils/mocks';

describe('websocket reducer', () => {
  it('should return the initial state', () => {
    expect(wsReducer(undefined, {})).toEqual(initialState)
  })

  it('should handle WS_CONNECTION_SUCCESS', () => {
    expect(wsReducer(initialState, wsConnectionSuccess())).toEqual(
      {
        ...initialState,
        wsConnected: true,
      }
    )
  })

  it('should handle WS_CONNECTION_CLOSE', () => {
    expect(wsReducer(initialState, wsConnectionClose())).toEqual(
      {
        ...initialState,
        wsConnected: false
      }
    )
  })

  it('should handle WS_CONNECTION_ERROR', () => {
    expect(wsReducer(initialState, wsConnectionClose())).toEqual(
      {
        ...initialState,
        wsConnected: false
      }
    )
  })

  it('should handle WS_CONNECTION_CLOSED', () => {
    expect(wsReducer(initialState, wsConnectionClosed())).toEqual(
      {
        ...initialState,
        wsConnected: false
      }
    )
  })

  it('should handle WS_GET_MESSAGE', () => {
    expect(wsReducer(initialState, wsGetMessage({ ...wsMessagesMock }))).toEqual(
      {
        ...initialState,
        messages: {
          ...wsMessagesMock
        }
      }
    )
  })
})