import React from 'react';
import PropTypes from 'prop-types';
import styles from './ingredient-details.module.css';
import { ingredientPropTypes } from '../../utils/types';

function IngredientDetails({ item }) {
  const { image, title, calories, proteins, fat, carbohydrates } = item;
  return (
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
    </div>
  )
}

IngredientDetails.propTypes = {
  item: ingredientPropTypes.isRequired,
};

export default IngredientDetails;