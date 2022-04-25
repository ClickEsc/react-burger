import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Button, 
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorItem from '../burger-constructor-item/burger-constructor-item';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { ingredientPropTypes } from '../../utils/constants';
import styles from './burger-constructor.module.css';


function BurgerConstructor({ data }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const bunOrder = data.filter(item => item.type === 'bun');
  const innerOrder = data.filter(item => item.type !== 'bun');
  const topLayer = bunOrder.filter((item, index) => index % 2 !== 0);
  const bottomLayer = bunOrder.filter((item, index) => index % 2 === 0);
  const totalPrice = data.reduce((acc, item) => acc + item.price, 0);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  }

  const renderItem = (arr, contentStyle, locked) => {
    return arr.map((item, index) => {
      const { _id, image, price, name } = item;

      const setName = (contentStyle) => {
        switch (contentStyle) {
          case 'topContent': {
            return `${name} (верх)`
          }
          case 'bottomContent': {
            return `${name} (низ)`
          }
          default: {
            return name
          }
        }
      }

      const specialName = setName(contentStyle);

      return (
        <li key={`${_id + index}`} className={styles.listItem}>
          <BurgerConstructorItem image={image} price={price} name={specialName} contentStyle={contentStyle} locked={locked}/>
        </li>
      )
    })
  }

  return (
    <section className={styles.section}>
      <ul className={styles.list}>
        {renderItem(topLayer, 'topContent', true)}
        <li className={styles.listItem}>
          <ul className={styles.innerList}>
            {renderItem(innerOrder, 'content', false)}
          </ul>
        </li>
        {renderItem(bottomLayer, 'bottomContent', true)}
      </ul>

      <div className={styles.total}>
        <p className={`text text_type_digits-medium ${styles.price}`}>
          {totalPrice}
          <span className={styles.currency}>
            <CurrencyIcon type="primary" />
          </span>
        </p>
        <Button
          type="primary"
          size="large"
          onClick={toggleModal}
        >
          Оформить заказ
        </Button>
      </div>
      {isModalOpen &&
        <Modal onClose={toggleModal}>
          <OrderDetails 
            orderId={Number("034536")}
          />
        </Modal>
      }
    </section>
  );
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientPropTypes).isRequired
};

export default BurgerConstructor;
