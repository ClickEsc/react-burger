import React, { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Counter,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import { IIngredient } from '../../utils/types';
import styles from './burger-ingredient-card.module.css';

const BurgerIngredientCard: FC<{ item: IIngredient }> = ({ item }) => {
  const location = useLocation<Location>();
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

export default BurgerIngredientCard;
