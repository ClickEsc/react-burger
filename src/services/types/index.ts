import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Action, ActionCreator, AnyAction } from 'redux';
import { store } from '../store';
import { TAppActions } from '../actions';
import { TAuthActions } from '../actions/auth'

type TApplicationActions = TAppActions | TAuthActions;
type TRootState = ReturnType<typeof store.getState>;
type TAppDispatch = ThunkDispatch<TRootState, never, TApplicationActions>;
type TAppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  TRootState,
  never,
  TApplicationActions
  >;

export type {
  TApplicationActions,
  TRootState,
  TAppDispatch,
  TAppThunk
};