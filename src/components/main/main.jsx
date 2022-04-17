import React from 'react';
import PropTypes from 'prop-types';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { testOrder, ingredientPropTypes } from '../../utils/constants';
import styles from './main.module.css';

function Main({data}) {
  return (
    <main className={styles.main}>
      <BurgerIngredients data={data} />
      <BurgerConstructor data={testOrder} />
    </main>
  );
}

Main.propTypes = {
  data: PropTypes.arrayOf(ingredientPropTypes)
};

export default Main;