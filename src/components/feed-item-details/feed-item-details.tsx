import React, { FC, useState, useEffect } from 'react';
import { useLocation, useRouteMatch } from 'react-router-dom';
import { shallowEqual } from 'react-redux';
import { useDispatch, useSelector } from '../../services/hooks';
import { convertDate, getStatus } from '../../services/utils';
import { IIngredient } from '../../utils/types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './feed-item-details.module.css';
import { wsConnectionStart } from '../../services/actions/wsActions';

interface MatchParams {
  id: string | undefined
}

const FeedItemDetails: FC = () => {
  const location = useLocation<Location>();
  const match = useRouteMatch<MatchParams>('/feed/:id')!;
  const dispatch = useDispatch();
  const { ingredientsList } = useSelector((state) => state.app, shallowEqual);
  const { orders } = useSelector((store) => store.ws.messages, shallowEqual);
  const currentFeedItem = orders.length && orders.find(({ _id }: { _id: string }) => _id === match.params.id);
  const [orderIngredientsData, setOrderIngredientsData] = useState<Array<IIngredient>>([])
  const isModal = typeof location.state !== "undefined";

  const totalPrice = orderIngredientsData.reduce((acc: number, item) => acc + item.price, 0);

  useEffect(() => {
    if (currentFeedItem && typeof currentFeedItem !== 'undefined') {
      const { _id, number, createdAt, name, ingredients } = currentFeedItem;
      if (ingredients.length) {
        const data = ingredientsList.filter(item => ingredients.indexOf(item._id) !== -1);
        setOrderIngredientsData(data)
      }
    }
  }, [currentFeedItem]);

    useEffect(() => {
    dispatch(wsConnectionStart('/all'));
  }, [dispatch]);

  return (
    currentFeedItem ?
      <div className={`${styles.details} ${isModal ? styles.detailsModal : ""}`}>
        <p className={`text text_type_digits-default ${styles.number} ${isModal ? styles.numberModal : ""}`}>#{currentFeedItem.number}</p>
        <h3 className={`text text_type_main-medium ${styles.title}`}>{currentFeedItem.name}</h3>
        <p className={`text text_type_main-default ${styles.status} ${currentFeedItem.status === "done" ? styles.done : ""} `}>{getStatus(currentFeedItem.status)}</p>
        <div className={styles.main}>
          <h4 className={`text text_type_main-medium ${styles.mainTitle}`}>Состав:</h4>
          <ul className={styles.list}>
            {orderIngredientsData.length > 0 && orderIngredientsData.length < 7 && orderIngredientsData.map((item, index) => (
              <li className={styles.listItem} key={index}>
                <div className={styles.info}>
                  <div className={styles.imageWrapper}>
                    <img className={styles.image} src={item.image_mobile} alt={`${item.name}`} />
                  </div>
                  <p>{item.name}</p>
                </div>
                <p className={`text text_type_main-default ${styles.price}`}>
                  {item.type === "bun"
                    ? 2
                    : currentFeedItem.ingredients.filter(el => el === item._id).length} х {item.price}
                  <span className={styles.currency}><CurrencyIcon type="primary" /></span>
                </p>
              </li>
            ))}
          </ul>
          <div className={styles.block}>
            <p className="text text_type_text-default">{convertDate(currentFeedItem.createdAt)}</p>
            <p className={`text text_type_digits-default ${styles.price}`}>
              {totalPrice}
              <span className={styles.currency}><CurrencyIcon type="primary" /></span>
            </p>
          </div>
        </div>
      </div> : null
  )
}

export default FeedItemDetails;