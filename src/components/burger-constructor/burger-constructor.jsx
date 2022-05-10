import React, { useState, useMemo, useReducer, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import {
  Button,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import { INCREASE_ITEM } from '../../services/actions';
import { getOrderNumber } from '../../api/api';
import { ERROR_FETCH_GET_ORDER_NUMBER, INVALID_ACTION_TYPE } from '../../utils/constants';
import BurgerConstructorItem from '../burger-constructor-item/burger-constructor-item';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import styles from './burger-constructor.module.css';


function BurgerConstructor() {
  const dispatch = useDispatch();
  const { ingredientsList, constructorIngredientsList } = useSelector(store => store.app);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [order, setOrder] = useState({});
  const totalPrice = useSelector(store =>
    store.app.constructorIngredientsList.reduce((acc, item) => acc + (item.type === 'bun' ? item.price * 2 : item.price) * item.__v, 0)
  );

  console.log('ingredientsList', ingredientsList)
  console.log('constructorIngredientsList', constructorIngredientsList)

  const [, dropTargetRef] = useDrop({
    accept: "ingredient",
    collect: monitor => ({
      isHover: monitor.isOver(),
    }),
    drop(item) {
      dispatch({
        type: INCREASE_ITEM,
        _id: item.id
      });
    },
  });

  const bunOrder = useMemo(
    () =>
    constructorIngredientsList.length && [constructorIngredientsList.find(item => item.__v > 0 && item.type === 'bun')],
    [constructorIngredientsList]
  );

  const innerOrder = useMemo(
    () =>
    constructorIngredientsList.length && constructorIngredientsList.filter(item => item.__v > 0 && item.type !== 'bun'),
    [constructorIngredientsList]
  );

  const orderItemsIds = useMemo(
    () =>
      constructorIngredientsList.length && [bunOrder.length && bunOrder, innerOrder.length && innerOrder].map(item => item.__v > 0 && item._id),
    [constructorIngredientsList]
  );

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  }

  const renderItem = (arr, contentStyle, locked) => {
    return arr.map((item, index) => {
      if (item) {
        const { _id, __v, image, price, name } = item;


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
            <BurgerConstructorItem item={item} _id={_id} image={image} price={price} name={specialName} contentStyle={contentStyle} locked={locked} />
          </li>
        )
      }
    })
  }

  const content = useMemo(
    () => {
      if (constructorIngredientsList.length) {
        return (
          <ul ref={dropTargetRef} className={styles.list}>
            {bunOrder.length ? renderItem(bunOrder, 'topContent', true) : <></>}
            <li className={styles.listItem}>
              <ul className={`${styles.innerList} ${!innerOrder.length ? styles.innerListEmpty : ''}`}>
                {innerOrder.length
                  ? renderItem(innerOrder, 'content', false)
                  : <p className={styles.innerEmpty}>Перенесите сюда желаемый ингредиент</p>}
              </ul>
            </li>
            {ingredientsList.length ? renderItem(bunOrder, 'bottomContent', true) : <></>}
          </ul>
        )
      }
    },
    [constructorIngredientsList]
  );

  const handlePlaceOrder = () => {
    getOrderNumber(orderItemsIds)
      .then(res => setOrder({ ...order, orderNumber: res.order.number }))
      .catch(err => console.log(`${ERROR_FETCH_GET_ORDER_NUMBER}: ${err}`))
    toggleModal();
  }

  useEffect(() => {
    if (ingredientsList.length) {
      const initialIngredients = ingredientsList.filter(item => item._id === "60d3b41abdacab0026a733c6" || item._id === "60d3b41abdacab0026a733ce");
      console.log(initialIngredients)
      return initialIngredients.forEach(item => dispatch({ type: INCREASE_ITEM, _id: item._id }));
    }
  }, [ingredientsList, dispatch])

  return (
    <section className={styles.section}>
      {content}
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
          onClick={handlePlaceOrder}
        >
          Оформить заказ
        </Button>
      </div>
      {isModalOpen && order.orderNumber &&
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
