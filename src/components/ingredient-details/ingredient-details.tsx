import React, { FC } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { shallowEqual } from 'react-redux';
import { useSelector } from '../../services/hooks';
import styles from './ingredient-details.module.css';

interface MatchParams {
  ingredientId: string | undefined
}

const IngredientDetails: FC = () => {
  const match = useRouteMatch<MatchParams>('/ingredients/:ingredientId')!;
  const { ingredientsList } = useSelector((state) => state.app, shallowEqual);
  const currentIngredient = ingredientsList.length && ingredientsList.find(({ _id }: { _id : string }) => _id === match.params.ingredientId);
  
  return (
    currentIngredient ?
    <div className={styles.details}>
      <div className={styles.main}>
        <img className={styles.img} src={currentIngredient?.image} alt={`${currentIngredient?.name}`} />
        <h3 className={`text text_type_main-medium ${styles.title}`}>{currentIngredient?.name}</h3>
      </div>
      <div className={styles.nutrients}>
        <div className={styles.block}>
          <p className="text text_type_main-default">Калории,ккал</p>
          <p className="text text_type_digits-default">{currentIngredient?.calories}</p>
        </div>
        <div className={styles.block}>
          <p className="text text_type_main-default">Белки, г</p>
          <p className="text text_type_digits-default">{currentIngredient?.proteins}</p>
        </div>
        <div className={styles.block}>
          <p className="text text_type_main-default">Жиры, г</p>
          <p className="text text_type_digits-default">{currentIngredient?.fat}</p>
        </div>
        <div className={styles.block}>
          <p className="text text_type_main-default">Углеводы, г</p>
          <p className="text text_type_digits-default">{currentIngredient?.carbohydrates}</p>
        </div>
      </div>
    </div> : null
  )
}

export default IngredientDetails;