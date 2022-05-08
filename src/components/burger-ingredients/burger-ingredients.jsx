import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import BurgerIngredientsSet from '../burger-ingredients-set/burger-ingredient-set';
import styles from './burger-ingredients.module.css';

function BurgerIngredients() {
  const { ingredientsList } = useSelector(store => store.app);

  const content = useMemo(
    () => {
      if (ingredientsList.length) {
        const bunsList = ingredientsList.filter(item => item.type === 'bun');
        const sauceList = ingredientsList.filter(item => item.type === 'sauce');
        const mainList = ingredientsList.filter(item => item.type === 'main');

        return ( 
          <div className={styles.sets}>
            <BurgerIngredientsSet title="Булки" list={bunsList} />
            <BurgerIngredientsSet title="Соусы" list={sauceList} />
            <BurgerIngredientsSet title="Начинки" list={mainList} />
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
        <nav className={styles.nav}>
          <ul className={styles.list}>
            <li className={`text text_type_main-default ${styles.active} ${styles.listItem}`}>Булки</li>
            <li className={`text text_type_main-default ${styles.listItem}`}>Соусы</li>
            <li className={`text text_type_main-default ${styles.listItem}`}>Начинки</li>
          </ul>
        </nav>
        {content}
      </div>
    </section>
  );
}

export default BurgerIngredients;
