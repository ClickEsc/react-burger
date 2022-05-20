import React, { useMemo, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import PanelText from '../panel-text/panel-text';
import { 
  IS_LOADING_TEXT,
  HAS_ERROR_TEXT
} from '../../utils/constants';
import { getBurgerIngredients } from '../../services/actions';
import styles from './app.module.css';
import { IngredientDetailedPage } from '../../pages';

function App() {
  const dispatch = useDispatch();
  const {
    ingredientsList,
    ingredientsRequest,
    ingredientsFailed
  } = useSelector(store => store.app, shallowEqual);

  const content = useMemo(
    () => {
      if (ingredientsRequest&& !ingredientsFailed) {
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
          <Router>
            <Switch>
            <Route exact path="/">
              {content}
            </Route>
            <Route path="/ingredients/:ingredientId">
              <IngredientDetailedPage />
            </Route>
          </Switch>
        </Router>
    </div>
  );
}

export default App;
