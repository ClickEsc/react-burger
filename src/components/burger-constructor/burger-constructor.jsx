import React, { useState, useMemo, useCallback } from 'react';
import uuid from 'react-uuid';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import {
  Button,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import { INCREASE_ITEM, REORGANIZE_ITEMS, getCurrentOrderNumber } from '../../services/actions';
import BurgerConstructorItem from '../burger-constructor-item/burger-constructor-item';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import DraggableConstructorIngredient from '../draggable-constructor-ingredient/draggable-constructor-ingredient';
import styles from './burger-constructor.module.css';

function BurgerConstructor() {
  const dispatch = useDispatch();
  const { burger, orderId } = useSelector(store => store.app.currentOrder);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const totalPrice = useSelector(store =>
    store.app.currentOrder.burger.reduce((acc, item) => {
      return acc + (item.type === 'bun' ? item.price * 2 : item.price) * item.__v
    }, 0)
  );

  const [, dropTargetRef] = useDrop({
    accept: "ingredient",
    collect: monitor => ({
      isHover: monitor.isOver(),
    }),
    drop(item) {
      dispatch({
        type: INCREASE_ITEM,
        item
      });
    },
  });

  const moveIngredient = (dragIndex, hoverIndex) => {
    innerOrder.splice(hoverIndex, 0, innerOrder.splice(dragIndex, 1)[0])

    dispatch({
      type: REORGANIZE_ITEMS,
      newBurgerState: innerOrder
    })
	}

  const bunOrder = useMemo(
    () =>
    burger.length && [burger.find(item => item.__v > 0 && item.type === 'bun')],
    [burger]
  );

  const innerOrder = useMemo(
    () =>
    burger.length && burger.filter(item => item.__v > 0 && item.type !== 'bun'),
    [burger]
  );

  const orderItemsIds = useMemo(
    () =>
      burger.length && burger.filter(item => item.__v).map(item => item._id),
    [burger]
  );

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  }

  const renderItem = (arr, contentStyle, locked) => {
    return arr.map((item, index) => {
      if (item) {
        const { _id, uuid, image, price, name } = item;

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
          <>
            {contentStyle === "content" 
              ?  
                <DraggableConstructorIngredient
                  key={uuid + item + contentStyle}
                  uuid={uuid}
                  index={index}
                  dragRefType="constructorIngredient"
                  ingredientData={item}
                  className={styles.listItem}
                  moveIngredient={moveIngredient}
                >
                  <BurgerConstructorItem
                    item={item}
                    uuid={uuid}
                    index={index}
                    _id={_id}
                    image={image}
                    price={price}
                    name={specialName}
                    contentStyle={contentStyle}
                    locked={locked}
                  />
                </DraggableConstructorIngredient>
              :
                <li
                  key={uuid + item + contentStyle}
                  className={styles.listItem}>
                  <BurgerConstructorItem
                    item={item}
                    uuid={uuid}
                    _id={_id}
                    image={image}
                    price={price}
                    name={specialName}
                    contentStyle={contentStyle}
                    locked={locked} />
                </li>
            }
          </>
        )
      }
    })
  }

  const content = useMemo(
    () => {
      // if (burger.length) {
        return (
          <ul ref={dropTargetRef} className={styles.list}>
            {bunOrder.length ? renderItem(bunOrder, 'topContent', true) : <></>}
            <li key={uuid()} className={styles.listItem}>
              <ul className={`${styles.innerList} ${!innerOrder.length ? styles.innerListEmpty : ''}`}>
                {burger.length && innerOrder.length
                  ? renderItem(innerOrder, 'content', false)
                  : <p key="text" className={styles.innerEmpty}>Перенесите сюда желаемый ингредиент</p>}
              </ul>
            </li>
            {bunOrder.length ? renderItem(bunOrder, 'bottomContent', true) : <></>}
          </ul>
        )
      // }
    },
    [burger]
  );

  const handlePlaceOrder = useCallback(
    () => {
    dispatch(getCurrentOrderNumber(orderItemsIds))
    toggleModal();
  }, [orderItemsIds, getCurrentOrderNumber, dispatch]);

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
          disabled={!orderItemsIds.length}
          type="primary"
          size="large"
          onClick={handlePlaceOrder}
        >
          Оформить заказ
        </Button>
      </div>
      {isModalOpen && orderId &&
        <Modal onClose={toggleModal}>
          <OrderDetails
            orderId={orderId}
          />
        </Modal>
      }
    </section>
  );
}

export default BurgerConstructor;
