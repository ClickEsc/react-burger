import React, { forwardRef } from 'react';
import { IIngredient } from '../../utils/types';
import { shallowEqual, useSelector } from 'react-redux';
import BurgerIngredientCard from '../burger-ingredient-card/burger-ingredient-card';
import styles from './burger-ingredients-set.module.css';
import DraggableIngredient from '../draggable-ingredient/draggable-ingredient';

const BurgerIngredientsSet = forwardRef<HTMLHeadingElement, { title: string, type: string }>(({ title, type }, ref) => {
  const { ingredientsList } = useSelector((store: { app: any }) => store.app, shallowEqual);

  const renderedList = ingredientsList.filter((el: IIngredient) => el.type === type).map((item: IIngredient) => {
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
      <h3 ref={ref} className={`text text_type_main-medium ${styles.title}`}>{title}</h3>
      <ul className={styles.list}>
        {renderedList}
      </ul>
    </>
  );
})

export default BurgerIngredientsSet;
