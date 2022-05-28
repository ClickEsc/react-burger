import React, { useMemo, useEffect } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import PanelText from '../panel-text/panel-text';
import {
  LoginPage,
  SignupPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  IngredientDetailedPage,
  ProfilePage,
  NotFoundPage
} from '../../pages';
import {
  IS_LOADING_TEXT,
  HAS_ERROR_TEXT
} from '../../utils/constants';
import { getBurgerIngredients } from '../../services/actions';
import styles from './app.module.css';
import ProtectedRoute from '../protected-route.jsx/protected-route';
import IngredientDetailedModal from '../ingredient-detailed-modal/ingredient-detailed-modal';


function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const {
    ingredientsList,
    ingredientsRequest,
    ingredientsFailed
  } = useSelector(store => store.app, shallowEqual);
  const background = location?.state?.background;

  const content = useMemo(
    () => {
      if (ingredientsRequest && !ingredientsFailed) {
        return <PanelText text={IS_LOADING_TEXT} isError={ingredientsFailed} />
      }
      if (ingredientsFailed) {
        return <PanelText text={HAS_ERROR_TEXT} isError={ingredientsFailed} />
      }
      if (!ingredientsRequest && !ingredientsFailed && ingredientsList.length) {
        return <Main />
      }
      else {
        return <></>
      }
    },
    [
      ingredientsRequest,
      ingredientsFailed,
      ingredientsList
    ]
  );

  useEffect(() => {
    dispatch(getBurgerIngredients())
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Switch location={background || location}>
        <Route exact path="/register">
          <SignupPage />
        </Route>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <Route exact path="/forgot-password">
          <ForgotPasswordPage />
        </Route>
        <Route exact path="/reset-password">
          <ResetPasswordPage />
        </Route>
        <Route exact path="/">
          {content}
        </Route>
        <Route path="/ingredients/:ingredientId">
          <IngredientDetailedPage />
        </Route>
        <ProtectedRoute exact path="/profile">
          <ProfilePage />
        </ProtectedRoute>
        <ProtectedRoute exact path="/profile/orders">
          {/* <ProfileOrders /> */}
        </ProtectedRoute>
        <Route path="/">
          <NotFoundPage />
        </Route>
      </Switch>
      {background && <Route path="/ingredients/:ingredientId">
        <IngredientDetailedModal />
      </Route>}
    </div>
  );
}

export default App;
