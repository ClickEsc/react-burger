import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { store } from '../store';
import { TAppActions } from '../actions';
import { TAuthActions } from '../actions/auth'
import { TWsActions } from '../actions/wsActions';

type TApplicationActions = TAppActions | TAuthActions | TWsActions;
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