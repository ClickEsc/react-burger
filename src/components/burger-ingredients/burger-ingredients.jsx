import React, { useRef, useMemo } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { switchTab } from '../../services/actions';
import BurgerIngredientsSet from '../burger-ingredients-set/burger-ingredient-set';
import Tabs from '../tabs/tabs';
import styles from './burger-ingredients.module.css';

function BurgerIngredients() {
  const dispatch = useDispatch();
  const { ingredientsList } = useSelector(store => store.app, shallowEqual);
  const bunTabRef = useRef();
  const sauceTabRef = useRef();
  const mainTabRef = useRef();

  const handleScroll = (e) => {
    const currentTabItems = [...e.target.querySelectorAll('h3')].filter(item => item.getBoundingClientRect().top <= e.target.getBoundingClientRect().top);
    const currentTabType = currentTabItems[currentTabItems.length - 1].innerText;

    const tabValuesObj = {
      "Булки": "bun",
      "Соусы": "sauce",
      "Начинки": "main"
    }

    dispatch(switchTab(tabValuesObj[currentTabType]))
  }

  const content = useMemo(
    () => {
      if (ingredientsList.length) {
        return ( 
          <div className={styles.sets} onScroll={handleScroll}>
            <BurgerIngredientsSet ref={bunTabRef} title="Булки" type="bun" />
            <BurgerIngredientsSet ref={sauceTabRef} title="Соусы" type="sauce" />
            <BurgerIngredientsSet ref={mainTabRef} title="Начинки" type="main" />
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
        <Tabs bunTabRef={bunTabRef} sauceTabRef={sauceTabRef} mainTabRef={mainTabRef} />
        {content}
      </div>
    </section>
  );
}

export default BurgerIngredients;
