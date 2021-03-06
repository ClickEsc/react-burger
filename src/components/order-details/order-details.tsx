import React, { FC } from 'react';
import { shallowEqual } from 'react-redux';
import { useSelector } from '../../services/hooks';
import {
  CheckMarkIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-details.module.css';

const OrderDetails: FC = () => {
  const { orderId } = useSelector((store) => store.app.currentOrder, shallowEqual);
  return (
    <div className={styles.details}>
      <div>
        <h3 className={styles.title}>
          <span className={`text text_type_digits-large ${styles.digits}`}>{orderId}</span>
          <span className={`text text_type_main-medium ${styles.text}`}>идентификатор заказа</span>
        </h3>
      </div>
      <div className={styles.imgWrapper}>
        <div className={`${styles.img} ${styles.rotating}`}></div>
        <CheckMarkIcon type="primary" />
      </div>
      <div className={styles.proceeding}>
        <p className={`text text_type_main-default ${styles.text}`}>Ваш заказ начали готовить</p>
        <p className={`text text_type_main-default ${styles.text} ${styles.grey}`}>Дождитесь готовности на орбитальной станции</p>
      </div>
    </div>
  )
}

export default OrderDetails;