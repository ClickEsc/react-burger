import React, { FC, ReactNode, useState, useMemo, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { debounce } from "debounce";
import { shallowEqual } from 'react-redux';
import { useDispatch, useSelector } from '../../services/hooks';
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
import { IIngredient } from '../../utils/types';
import { AnyAction } from 'redux';

const BurgerConstructor: FC = () => {
  const location = useLocation<{ pathname: string, state: { from: Location }}>();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth, shallowEqual);
  const { burger, orderId, orderNumberRequest, orderNumberFailed } = useSelector((store) => store.app.currentOrder, shallowEqual);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const totalPrice = useSelector((store) =>
    store.app.currentOrder.burger.reduce((acc: number, item: IIngredient) => {
      return acc + (item.type === 'bun' ? item.price * 2 : item.price) * item.__v
    }, 0)
  );
  const history = useHistory();

  const [, dropTargetRef] = useDrop({
    accept: "ingredient",
    collect: monitor => ({
      isHover: monitor.isOver(),
    }),
    drop(item) {
      const uuid = uuidv4();
      dispatch(increaseItem(item as IIngredient, uuid))
    },
  });

  const bunOrder = useMemo<Array<IIngredient | undefined>>(
    () =>
      burger.length ? [burger.find((item: IIngredient) => item.__v > 0 && item.type === 'bun')] : [],
    [burger]
  );

  const innerOrder = useMemo<Array<IIngredient>>(
    () =>
      burger.length ? burger.filter((item: IIngredient) => item.__v > 0 && item.type !== 'bun') : [],
    [burger]
  );

  const orderItemsIds = useMemo<string[]>(
    () =>
      burger.length ? burger.filter((item: IIngredient)=> item.__v).map((item: IIngredient) => item._id) : [],
    [burger]
  );

  const moveIngredient = (dragIndex: number, hoverIndex: number) => {
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

  const renderItem: (arr: Array<IIngredient | undefined>, contentStyle: string, locked: boolean) => ReactNode = (arr, contentStyle, locked) => {
    return arr.map((item: IIngredient | undefined, index: number) => {
      if (item) {
        const { uuid, name } = item;

        const setName = (contentStyle: string) => {
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
                index={index}
                dragRefType="constructorIngredient"
                ingredientData={item}
                // className={styles.listItem}
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

  const content = useMemo<ReactNode>(
    () => {
      // if (burger.length) {
      return (
        <ul ref={dropTargetRef} className={styles.list}>
          {bunOrder.length ? renderItem(bunOrder, 'topContent', true) : <></>}
          <li key={uuidv4()} className={styles.listItem}>
            <ul className={`${styles.innerList} ${!innerOrder.length ? styles.innerListEmpty : ''}`}>
              {burger.length && innerOrder.length
                ? renderItem(innerOrder.map((item: IIngredient, index: number) => {
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

  const contentModal = useMemo<ReactNode>(
    () => {
      if (orderNumberRequest && !orderNumberFailed) {
        return <PanelText text={IS_LOADING_TEXT} isError={orderNumberFailed} />
      }
      if (orderNumberFailed) {
        return <PanelText text={HAS_ERROR_TEXT} isError={orderNumberFailed} />
      }
      if (!orderNumberRequest && !orderNumberFailed && orderId) {
        return <OrderDetails />
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
      if (!user.isAuthorized) {
        history.push({
          pathname: '/login',
          state: {
            from: location,
          },
        });
  
        return;
      }
      dispatch(getCurrentOrderNumber(orderItemsIds) as unknown as AnyAction)
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
