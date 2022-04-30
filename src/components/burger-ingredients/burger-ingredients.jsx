import React, { useContext } from 'react';
import BurgerIngredientsSet from '../burger-ingredients-set/burger-ingredient-set';
import { BurgerContext } from '../../contexts/burgerContext';
import styles from './burger-ingredients.module.css';

function BurgerIngredients() {
  const burgerContext = useContext(BurgerContext);
  const bunsList = burgerContext.filter(item => item.type === 'bun');
  const sauceList = burgerContext.filter(item => item.type === 'sauce');
  const mainList = burgerContext.filter(item => item.type === 'main');

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

        <div className={styles.sets}>
          <BurgerIngredientsSet title="Булки" list={bunsList} />
          <BurgerIngredientsSet title="Соусы" list={sauceList} />
          <BurgerIngredientsSet title="Начинки" list={mainList} />
        </div>

      </div>
    </section>
  );
}

export default BurgerIngredients;
