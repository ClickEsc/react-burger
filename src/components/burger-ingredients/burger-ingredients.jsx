import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TAB_SWITCH } from '../../services/actions';
import BurgerIngredientsSet from '../burger-ingredients-set/burger-ingredient-set';
import Tabs from '../tabs/tabs';
import styles from './burger-ingredients.module.css';

function BurgerIngredients() {
  const dispatch = useDispatch();
  const { ingredientsList } = useSelector(store => store.app);

  const handleScroll = (e) => {
    const currentTabItems = [...e.target.querySelectorAll('h3')].filter(item => item.getBoundingClientRect().top <= e.target.getBoundingClientRect().top);
    const currentTabType = currentTabItems[currentTabItems.length - 1].innerText;

    const tabValuesObj = {
      "Булки": "bun",
      "Соусы": "sauce",
      "Начинки": "main"
    }

    dispatch({ type: TAB_SWITCH, tabType: tabValuesObj[currentTabType] })
  }

  const content = useMemo(
    () => {
      if (ingredientsList.length) {
        return ( 
          <div className={styles.sets} onScroll={handleScroll}>
            <BurgerIngredientsSet title="Булки" type="bun" />
            <BurgerIngredientsSet title="Соусы" type="sauce" />
            <BurgerIngredientsSet title="Начинки" type="main" />
          </div>
        );
      }
    },
    [ingredientsList]
  );

  return (
    <section className={styles.section}>
      <div>
        <h3 className={`text text_type_main-large ${styles.title}`}>Соберите бургер</h3>
        <Tabs />
        {content}
      </div>
    </section>
  );
}

export default BurgerIngredients;
