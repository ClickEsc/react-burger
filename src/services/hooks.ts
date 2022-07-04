import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { AnyAction, Dispatch } from 'redux';
import { TAppActions } from './actions';
import { TAppDispatch, TAppThunk, TRootState } from './types';

const useDispatch = () => dispatchHook<TAppDispatch | TAppThunk>();
const useSelector: TypedUseSelectorHook<TRootState> = selectorHook;

export {
  useDispatch,
  useSelector
};