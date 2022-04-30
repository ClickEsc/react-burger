import React, { useContext, useState, useMemo, useReducer, useEffect } from 'react';
import {
  Button, 
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerContext } from '../../contexts/burgerContext';
import { INVALID_ACTION_TYPE } from '../../utils/constants';
import BurgerConstructorItem from '../burger-constructor-item/burger-constructor-item';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import styles from './burger-constructor.module.css';

function BurgerConstructor() {
  const burgerContext = useContext(BurgerContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          <BurgerConstructorItem image={image} price={price} name={specialName} contentStyle={contentStyle} locked={locked}/>
        </li>
      )
    })
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

export default BurgerConstructor;
