import React from 'react';
import IngredientDetails from '../components/ingredient-details/ingredient-details';
import styles from './page.module.css';

export function IngredientDetailedPage() {
  return (
    <div className={`${styles.container} ${styles.containerDiff}`}>
          <h2 className={`${styles.title} text text_type_main-large`}>Детали ингредиента</h2>
          <IngredientDetails />
    </div>
  );
}
