import React from 'react';
import styles from './ingredient-details.module.css';

function IngredientDetails({ image, title, description, calories, proteins, fat, carbohydrates }) {
  return (
    <div className={styles.details}>
      <div className={styles.main}>
        <img className={styles.img} src={image} alt={`Изображение `} />
        <h3 className="text text_type_main-medium">{title}</h3>
        <p>{description}</p>
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

export default IngredientDetails;