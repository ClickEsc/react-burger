import React from 'react';
import PropTypes from 'prop-types';
import { 
  CheckMarkIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-details.module.css';

function OrderDetails({ orderId }) {
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

OrderDetails.propTypes = {
  orderId: PropTypes.number.isRequired
};

export default OrderDetails;