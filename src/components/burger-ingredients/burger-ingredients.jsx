import React from 'react';
import PropTypes from 'prop-types';
import BurgerIngredientsSet from '../burger-ingredients-set/burger-ingredient-set';
import { ingredientPropTypes } from '../../utils/constants';
import styles from './burger-ingredients.module.css';

function BurgerIngredients({ data }) {
  const bunsList = data.filter(item => item.type === 'bun');
  const sauceList = data.filter(item => item.type === 'sauce');
  const mainList = data.filter(item => item.type === 'main');

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

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientPropTypes).isRequired
};

export default BurgerIngredients;
