import React, { useState, useMemo, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { debounce } from "debounce";
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import {
  Button,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import { increaseItem, getCurrentOrderNumber, reorganizeItems } from '../../services/actions';
import BurgerConstructorItem from '../burger-constructor-item/burger-constructor-item';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import DraggableConstructorIngredient from '../draggable-constructor-ingredient/draggable-constructor-ingredient';
import PanelText from '../panel-text/panel-text';
import { 
  IS_LOADING_TEXT,
  HAS_ERROR_TEXT
} from '../../utils/constants';
import styles from './burger-constructor.module.css';

function BurgerConstructor() {
  const dispatch = useDispatch();
  const { ingredientsList }= useSelector(store => store.app, shallowEqual);
  const { burger, orderId, orderNumberRequest, orderNumberFailed } = useSelector(store => store.app.currentOrder, shallowEqual);
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
      const uuid = uuidv4();
      dispatch(increaseItem(item, uuid))
    },
  });

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

  const moveIngredient = (dragIndex, hoverIndex) => {
    const dragCard = innerOrder[dragIndex];

    const newBurgerState = [...innerOrder];
    newBurgerState.splice(dragIndex, 1);
    newBurgerState.splice(hoverIndex, 0, dragCard);

    dispatch(reorganizeItems(newBurgerState))
  }

  const moveItems = useCallback(debounce(moveIngredient, 300), [innerOrder]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  }

  const renderItem = (arr, contentStyle, locked) => {
    return arr.map((item, index) => {
      if (item) {
        const { uuid, name } = item;

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
          <React.Fragment key={uuid}>
            {contentStyle === "content"
              ?
              <DraggableConstructorIngredient
                uuid={uuid}
                index={index}
                dragRefType="constructorIngredient"
                ingredientData={item}
                className={styles.listItem}
                moveIngredient={moveItems}
              >
                <BurgerConstructorItem
                  item={item}
                  name={specialName}
                  contentStyle={contentStyle}
                  locked={locked}
                />
              </DraggableConstructorIngredient>
              :
              <li
                className={styles.listItem}>
                <BurgerConstructorItem
                  item={item}
                  name={specialName}
                  contentStyle={contentStyle}
                  locked={locked} />
              </li>
            }
          </React.Fragment>
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
          <li key={uuidv4()} className={styles.listItem}>
            <ul className={`${styles.innerList} ${!innerOrder.length ? styles.innerListEmpty : ''}`}>
              {burger.length && innerOrder.length
                ? renderItem(innerOrder.map((item, index) => {
                  return { ...item, index: index }
                }), 'content', false)
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

  const contentModal = useMemo(
    () => {
      if (orderNumberRequest && !orderNumberFailed) {
        return <PanelText text={IS_LOADING_TEXT} isError={orderNumberFailed} />
      }
      if (orderNumberFailed) {
        return <PanelText text={HAS_ERROR_TEXT} isError={orderNumberFailed} />
      }
      if (!orderNumberRequest && !orderNumberFailed && orderId) {
        return <OrderDetails orderId={orderId}
        />
      }
      else {
        return <></>
      }
    },
    [
      orderNumberRequest,
      orderNumberFailed,
      orderId
    ]
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
      {isModalOpen &&
        <Modal onClose={toggleModal}>
          {contentModal}
        </Modal>
      }
    </section>
  );
}

export default BurgerConstructor;
