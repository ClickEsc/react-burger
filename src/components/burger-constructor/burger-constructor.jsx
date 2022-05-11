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
import DraggableIngredient from '../draggable-ingredient/draggable-ingredient';
import styles from './burger-constructor.module.css';

function BurgerConstructor() {
  const dispatch = useDispatch();
  const { burger, orderId } = useSelector(store => store.app.currentOrder);
  const [dragId, setDragId] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const totalPrice = useSelector(store =>
    store.app.currentOrder.burger.reduce((acc, item) => {
      return acc + (item.type === 'bun' ? item.price * 2 : item.price) * item.__v
    }, 0)
  );

  // console.log('burger', burger);

  const [, dropTargetRef] = useDrop({
    accept: "ingredient",
    collect: monitor => ({
      isHover: monitor.isOver(),
    }),
    drop(item, monitor) {
      // console.log(item, monitor)
      dispatch({
        type: INCREASE_ITEM,
        id: item.id
      });
    },
  });

  const moveIngredient = (dragIndex, hoverIndex) => {
		const dragIngredient = burger[dragIndex];

		const newBurgerState = {
				$splice: [
					[dragIndex, 1],
					[hoverIndex, 0, dragIngredient]
				]
		}

    dispatch({
      type: REORGANIZE_ITEMS,
      newBurgerState
    })
	}

  const [, constructorDropTargetRef] = useDrop({
    accept: "constructorIngredient",
    collect: monitor => ({
      isHover: monitor.isOver(),
    }),
    // drop(item, monitor) {
    //   console.log(item, monitor.targetId)
    //   moveIngredient(item.id, monitor.targetId)
    // }
  });

  // const handleDrag = (ev) => {
  //   console.log(ev)
  //   setDragId(ev.currentTarget.id);
  // };

  // const handleDrop = (ev) => {
  //   console.log(ev)
  //   const dragBox = burger.find(item => item._id === dragId);
  //   const dropBox = burger.find(item => item._id === ev.id);

  //   const dragBoxOrder = dragBox.order;
  //   const dropBoxOrder = dropBox.order;

  //   const newBoxState = burger.map(item => {
  //     if (item._id === dragId) {
  //       item.order = dropBoxOrder;
  //     }
  //     if (item._id === ev.currentTarget.id) {
  //       item.order = dragBoxOrder;
  //     }
  //     return item;
  //   });

  //   // setBoxes(newBoxState);
  //   console.log(newBoxState)
  // };


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
          <>
            {contentStyle === "content" 
              ?  
                <DraggableIngredient
                  key={uuid() + item + contentStyle}
                  dragRefType="constructorIngredient"
                  ingredientData={item}
                  className={styles.listItem}
                  // handleDrag={handleDrag}
                >
                  <BurgerConstructorItem item={item} _id={_id} image={image} price={price} name={specialName} contentStyle={contentStyle} locked={locked} />
                </DraggableIngredient>
              :
                <li key={uuid() + item + contentStyle} className={styles.listItem}>
                  <BurgerConstructorItem item={item} _id={_id} image={image} price={price} name={specialName} contentStyle={contentStyle} locked={locked} />
                </li>
            }
          </>
        )
      }
    })
  }

  const content = useMemo(
    () => {
      if (burger.length) {
        return (
          <ul ref={dropTargetRef} className={styles.list}>
            {bunOrder.length ? renderItem(bunOrder, 'topContent', true) : <></>}
            <li key={uuid()} className={styles.listItem}>
              <ul ref={constructorDropTargetRef} className={`${styles.innerList} ${!innerOrder.length ? styles.innerListEmpty : ''}`}>
                {innerOrder.length
                  ? renderItem(innerOrder, 'content', false)
                  : <p key="text" className={styles.innerEmpty}>Перенесите сюда желаемый ингредиент</p>}
              </ul>
            </li>
            {bunOrder.length ? renderItem(bunOrder, 'bottomContent', true) : <></>}
          </ul>
        )
      }
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
