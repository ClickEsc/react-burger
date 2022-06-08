import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Counter,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropTypes } from '../../utils/types';
import styles from './burger-ingredient-card.module.css';

function BurgerIngredientCard({ item }) {
  const location = useLocation();
  const { _id, __v: count, image, price, name } = item;

  return (
    <Link
      className={styles.link}
      to={{
        pathname:`/ingredients/${_id}`,
        state: { background: location }
      }}>
      <div className={styles.card}>
        <div className={styles.counter}>
          {count > 0 ? <Counter count={count} size="default" /> : <></>}
        </div>

        <div className={styles.wrapper}>
          <img className={styles.image} src={image} alt={`${name}`} />
          <p className={`text text_type_digits-default ${styles.price}`}>
            {price}
            <span className={styles.currency}><CurrencyIcon type="primary" /></span>
          </p>
        </div>

        <div>
          <h4 className={`text text_type_main-default ${styles.title}`}>{name}</h4>
        </div>
      </div>
    </Link>
  );
}

BurgerIngredientCard.propTypes = {
  item: ingredientPropTypes.isRequired
};

export default BurgerIngredientCard;
