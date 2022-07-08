import React, { FC, useState, useMemo, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { shallowEqual } from 'react-redux';
import { useDispatch, useSelector } from '../../services/hooks';
import {
  Button,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

import { IIngredient, IOrder } from '../../utils/types';
import styles from './feed-item-card.module.css';
import { convertDate } from '../../services/utils';

const FeedItemCard: FC<{ item: IOrder }> = ({ item }) => {
  const location = useLocation<Location>();
  const { ingredientsList } = useSelector((store) => store.app, shallowEqual);
  const { _id, number, createdAt, name, ingredients } = item;
  const date = convertDate(createdAt);
  const [orderIngredientsData, setOrderIngredientsData] = useState<Array<IIngredient>>([])

  const price = ingredientsList.filter(item => ingredients.indexOf(item._id) !== -1).reduce((acc: number, item: IIngredient) => {
    return acc + (item.type === 'bun' ? item.price * 2 : item.price)
  }, 0)

  useEffect(() => {
    if (ingredients.length) {
      const data = ingredientsList.filter(item => ingredients.indexOf(item._id) !== -1);
      setOrderIngredientsData(data)
    }
  }, [ingredients]);

  return (
    <Link
      className={styles.link}
      to={{
        pathname: `/feed/${_id}`,
        state: { background: location }
      }}>
      <div className={styles.card}>
        <div className={styles.container}>

          <div className={styles.wrapper}>
            <p className={`text text_type_digits-default ${styles.number}`}>#{number}</p>
            <p className={`text text_type_main-default text_color_inactive ${styles.time}`}>{date}</p>
          </div>

          <div>
            <h3 className={`text text_type_main-medium ${styles.title}`}>{name}</h3>
          </div>

          <div className={styles.wrapper}>
            <div className={styles.btnsWrapper}>
              {orderIngredientsData.length > 0 && orderIngredientsData.length < 7 && orderIngredientsData.map((item, index) => {
                return (
                  <div className={styles.imageWrapper} key={index}>
                    <img className={`${styles.image} ${index === 5 ? styles.imageLast : ''}`} src={item.image_mobile} alt={`${item.name}`} />
                    {orderIngredientsData.length > 6 && <p className={`text text_type_digits-default ${styles.more}`}>+{orderIngredientsData.length - 5}</p>}
                  </div>
                )
              })}
            </div>

            <p className={`text text_type_digits-default ${styles.price}`}>
              {price}
              <span className={styles.currency}><CurrencyIcon type="primary" /></span>
            </p>
          </div>

        </div>
      </div>
    </Link>
  );
}

export default FeedItemCard;
