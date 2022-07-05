import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { TAppDispatch, TAppThunk, TRootState } from './types';

const useDispatch = () => dispatchHook<TAppDispatch>();
const useSelector: TypedUseSelectorHook<TRootState> = selectorHook;

export {
  useDispatch,
  useSelector
};