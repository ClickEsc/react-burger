import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {
  DragIcon,
  CurrencyIcon,
  LockIcon,
  DeleteIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import { DECREASE_ITEM } from '../../services/actions';
import styles from './burger-constructor-item.module.css';
import { ingredientPropTypes } from '../../utils/types';

function BurgerConstructorItem({ item, name, contentStyle, locked }) {
  const { _id, uuid, image, price } = item;
  const dispatch = useDispatch();

  const onDeleteBtnClick = () => {
    dispatch({ type: DECREASE_ITEM, id: _id, uuid })
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

BurgerConstructorItem.propTypes = {
  item: ingredientPropTypes.isRequired,
  name: PropTypes.string.isRequired,
  contentStyle: PropTypes.string.isRequired,
  locked: PropTypes.bool.isRequired
};

export default BurgerConstructorItem;
