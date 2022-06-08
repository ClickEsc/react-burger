import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import styles from './ingredient-details.module.css';

function IngredientDetails() {
  const match = useRouteMatch('/ingredients/:ingredientId');
  const { ingredientsList } = useSelector(state => state.app, shallowEqual);
  const currentIngredient = ingredientsList.length && ingredientsList.find(({ _id }) => _id === match.params.ingredientId);
  const { image, title, calories, proteins, fat, carbohydrates } = currentIngredient;
  
  return (
    currentIngredient ?
    <div className={styles.details}>
      <div className={styles.main}>
        <img className={styles.img} src={image} alt={`${title}`} />
        <h3 className="text text_type_main-medium">{title}</h3>
      </div>
      <div className={styles.nutrients}>
        <div className={styles.block}>
          <p className="text text_type_main-default">Калории,ккал</p>
          <p className="text text_type_digits-default">{calories}</p>
        </div>
        <div className={styles.block}>
          <p className="text text_type_main-default">Белки, г</p>
          <p className="text text_type_digits-default">{proteins}</p>
        </div>
        <div className={styles.block}>
          <p className="text text_type_main-default">Жиры, г</p>
          <p className="text text_type_digits-default">{fat}</p>
        </div>
        <div className={styles.block}>
          <p className="text text_type_main-default">Углеводы, г</p>
          <p className="text text_type_digits-default">{carbohydrates}</p>
        </div>
      </div>
    </div> : null
  )
}

export default IngredientDetails;