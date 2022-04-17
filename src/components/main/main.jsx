import React from 'react';
import PropTypes from 'prop-types';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { testOrder } from '../../utils/constants';
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
  data: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
    __v: PropTypes.number
  }))
};

export default Main;