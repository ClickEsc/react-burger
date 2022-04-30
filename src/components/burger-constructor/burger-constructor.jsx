import React, { useContext, useState, useMemo, useReducer, useEffect } from 'react';
import {
  Button,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerContext } from '../../contexts/burgerContext';
import { getOrderNumber } from '../../api/api';
import { ERROR_FETCH_GET_ORDER_ID, INVALID_ACTION_TYPE } from '../../utils/constants';
import BurgerConstructorItem from '../burger-constructor-item/burger-constructor-item';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import styles from './burger-constructor.module.css';

function BurgerConstructor() {
  const burgerContext = useContext(BurgerContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [order, setOrder] = useState({});

  const bunOrder = useMemo(
    () =>
      [burgerContext.find(item => item.type === 'bun')],
    [burgerContext]
  );

  const innerOrder = useMemo(
    () =>
      burgerContext.filter(item => item.type !== 'bun'),
    [burgerContext]
  );

  const orderItemsIds = useMemo(
    () =>
      [...bunOrder, ...innerOrder].map(item => item._id),
    [burgerContext]
  );

  const totalPriceInitialState = 0;

  function reducer(state, action) {
    switch (action.type) {
      case "bun":
        return action.payload.price * 2;
      case "inner":
        return state + action.payload.price;
      default:
        throw new Error(`${INVALID_ACTION_TYPE}: ${action.type}`);
    }
  }

  const [totalPriceState, totalPriceDispatcher] = useReducer(reducer, totalPriceInitialState, undefined);

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
          <BurgerConstructorItem image={image} price={price} name={specialName} contentStyle={contentStyle} locked={locked} />
        </li>
      )
    })
  }

  const handlePlaceOrder = () => {
    getOrderNumber(orderItemsIds)
      .then(res => setOrder({ ...order, orderNumber: res.order.number }))
      .catch(err => console.log(`${ERROR_FETCH_GET_ORDER_ID}: ${err}`))
    toggleModal();
  }

  useEffect(() => {
    if (bunOrder.length) {
      bunOrder.forEach(item => totalPriceDispatcher({ type: "bun", payload: item }))
    }
  }, [bunOrder]);

  useEffect(() => {
    if (innerOrder.length) {
      innerOrder.forEach(item => totalPriceDispatcher({ type: "inner", payload: item }))
    }
  }, [innerOrder]);

  return (
    <section className={styles.section}>
      <ul className={styles.list}>
        {renderItem(bunOrder, 'topContent', true)}
        <li className={styles.listItem}>
          <ul className={styles.innerList}>
            {renderItem(innerOrder, 'content', false)}
          </ul>
        </li>
        {renderItem(bunOrder, 'bottomContent', true)}
      </ul>

      <div className={styles.total}>
        <p className={`text text_type_digits-medium ${styles.price}`}>
          {totalPriceState}
          <span className={styles.currency}>
            <CurrencyIcon type="primary" />
          </span>
        </p>
        <Button
          type="primary"
          size="large"
          onClick={handlePlaceOrder}
        >
          Оформить заказ
        </Button>
      </div>
      {isModalOpen &&
        <Modal onClose={toggleModal}>
          <OrderDetails
            orderId={order.orderNumber}
          />
        </Modal>
      }
    </section>
  );
}

export default BurgerConstructor;
