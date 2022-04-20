import React from 'react';
import PropTypes from 'prop-types';
import BurgerIngredientCard from '../burger-ingredient-card/burger-ingredient-card';
import { ingredientPropTypes } from '../../utils/constants';
import styles from './burger-ingredients-set.module.css';

function BurgerIngredientsSet({ title, list }) {
  const renderedList = list.map(item => {
    const { _id, image, price, name, calories, proteins, fat, carbohydrates } = item;
    return (
      <li key={_id}>
        <BurgerIngredientCard 
          image={image} 
          price={price} 
          name={name}
          calories={calories}
          proteins={proteins}
          fat={fat}
          carbohydrates={carbohydrates}
        />
      </li>
    )
  })
  return (
    <>
      <h3 className={`text text_type_main-medium ${styles.title}`}>{title}</h3>
      <ul className={styles.list}>
        {renderedList}
      </ul>
    </>
  );
}

BurgerIngredientsSet.propTypes = {
  title: PropTypes.string.isRequired,
  list: PropTypes.arrayOf(ingredientPropTypes).isRequired
}

export default BurgerIngredientsSet;
