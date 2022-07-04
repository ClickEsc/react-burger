import React, { FC } from 'react';
import { useDispatch } from '../../services/hooks';
import {
  DragIcon,
  CurrencyIcon,
  LockIcon,
  DeleteIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import { decreaseItem } from '../../services/actions';
import { IIngredient } from '../../utils/types';
import styles from './burger-constructor-item.module.css';

const BurgerConstructorItem: FC<{ item: IIngredient, name: string, contentStyle: string, locked: boolean }> = ({ item, name, contentStyle, locked }) => {
  const { _id, uuid, image, price } = item;
  const dispatch = useDispatch();

  const onDeleteBtnClick = () => {
    dispatch(decreaseItem(_id, uuid))
  }

  return (
    <div className={styles.item}>
      <div className={styles.wrapper}>

        <button className={styles.buttonDrag}>
          {contentStyle === "content" && <DragIcon type="primary" />}
        </button>

        <div className={styles[contentStyle]}>
          <div className={styles.container}>
            <img className={styles.image} src={image} alt={`${name}`} />
            <h4 className={`text text_type_main-default ${styles.title}`}>{name}</h4>
          </div>
          <div className={styles.container}>
            <p className={`text text_type_digits-default ${styles.price}`}>
              {price}
              <span className={styles.currency}><CurrencyIcon type="primary" /></span>
            </p>
            {locked ?
              <button className={styles.button}><LockIcon type="secondary" /></button>
              :
              <button className={styles.button}><DeleteIcon type="primary" onClick={onDeleteBtnClick} /></button>
            }
          </div>
        </div>

      </div>
    </div>
  );
}

export default BurgerConstructorItem;
