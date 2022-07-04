import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Action, ActionCreator, AnyAction } from 'redux';
import { store } from '../store';
import { TAppActions } from '../actions';
import { TAuthActions } from '../actions/auth'

type TApplicationActions = TAppActions | TAuthActions;
type TRootState = ReturnType<typeof store.getState>;
type TAppDispatch = typeof store.dispatch & ThunkDispatch<TRootState, null, AnyAction>
type TAppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, TRootState, TApplicationActions>
>;

export type {
  TApplicationActions,
  TRootState,
  TAppDispatch,
  TAppThunk
};