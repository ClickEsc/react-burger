import React, { useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import PanelText from '../panel-text/panel-text';
import { 
  IS_LOADING_TEXT,
  HAS_ERROR_TEXT
} from '../../utils/constants';
import { getBurgerIngredients, getConstructorIngredients } from '../../services/actions';
import styles from './app.module.css';

function App() {
  const dispatch = useDispatch();
  const {
    ingredientsList,
    ingredientsRequest,
    ingredientsFailed,
    constructorIngredientsRequest,
    constructorIngredientsFailed,
  } = useSelector(store => store.app);
  const { burger } = useSelector(store => store.app.currentOrder);

  const content = useMemo(
    () => {
      if ((ingredientsRequest || constructorIngredientsRequest) && !ingredientsFailed && !constructorIngredientsFailed) {
        return <PanelText text={IS_LOADING_TEXT} isError={ingredientsFailed || constructorIngredientsFailed} />
      }
      if (ingredientsFailed || constructorIngredientsFailed) {
        return <PanelText text={HAS_ERROR_TEXT} isError={ingredientsFailed || constructorIngredientsFailed} />
      }
      if (!ingredientsRequest && !ingredientsFailed && ingredientsList.length &&
        !constructorIngredientsRequest && !constructorIngredientsFailed && burger.length) {
        return <Main />
      }
       else {
        return <></>
      }
    },
    [
      ingredientsRequest,
      ingredientsFailed,
      ingredientsList,
      constructorIngredientsRequest,
      constructorIngredientsFailed,
      burger
    ]
  );

  useEffect(() => {
    dispatch(getBurgerIngredients())
  }, [dispatch]);

  return (
    <div className={styles.app}>
        <AppHeader />
        {content}
    </div>
  );
}

export default App;
