import React from 'react';
import PropTypes from 'prop-types';
import { shallowEqual, useSelector } from 'react-redux';
import BurgerIngredientCard from '../burger-ingredient-card/burger-ingredient-card';
import styles from './burger-ingredients-set.module.css';
import DraggableIngredient from '../draggable-ingredient/draggable-ingredient';

function BurgerIngredientsSet({ title, type }) {
  const { ingredientsList } = useSelector(store => store.app, shallowEqual);

  const renderedList = ingredientsList.filter(el => el.type === type).map(item => {
    const { _id } = item;
    return (
      <DraggableIngredient key={_id} dragRefType="ingredient" ingredientData={item}>
          <BurgerIngredientCard
            item={item}
          />
      </DraggableIngredient>
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
  type: PropTypes.string.isRequired
}

export default BurgerIngredientsSet;
