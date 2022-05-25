import React, { useMemo, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
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


function App() {
  const dispatch = useDispatch();
  const {
    ingredientsList,
    ingredientsRequest,
    ingredientsFailed
  } = useSelector(store => store.app, shallowEqual);

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
      <Router>
        <AppHeader />
        <Switch>
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
          <ProtectedRoute exact path="/">
            {content}
          </ProtectedRoute>
          <ProtectedRoute path="/ingredients/:ingredientId">
            <IngredientDetailedPage />
          </ProtectedRoute>
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
      </Router>
    </div>
  );
}

export default App;
