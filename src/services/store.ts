import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers';
import { compose } from 'redux';
import { socketMiddleware } from './middleware/socketMiddleware';
import { WS_URL } from '../utils/constants';
import { wsActions } from './actions/wsActions';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(WS_URL, wsActions)));

const store = createStore(rootReducer, enhancer);

export {
  composeEnhancers,
  store
};