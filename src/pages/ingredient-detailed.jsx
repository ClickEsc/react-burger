import React, { useEffect, useCallback } from 'react';
import { useDispatch, shallowEqual, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import IngredientDetails from '../components/ingredient-details/ingredient-details';
import { defineCurrentIngredient } from '../services/actions';
import styles from './ingredient-detailed.module.css';

export function IngredientDetailedPage() {
  const dispatch = useDispatch();
  const { ingredientsList, currentIngredient } = useSelector(store => store.app, shallowEqual);
  const { ingredientId } = useParams();

  const loadIngredientInfo = useCallback(
    () => {
      if (ingredientsList) {
        const currentIngredient = ingredientsList.find(({ _id }) => _id === ingredientId)
        dispatch(defineCurrentIngredient(currentIngredient))
      }
    },
    [ingredientId, ingredientsList]
  );

  useEffect(
    () => {
      ingredientId && loadIngredientInfo();
    },
    [ingredientId, loadIngredientInfo]
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {currentIngredient
          ? <>
            <h2 className={`${styles.title} text text_type_main-large`}>Детали ингредиента</h2>
            <IngredientDetails />
          </>
          : null}
      </div>
    </div>
  );
}
