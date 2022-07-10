import React, { FC } from 'react';
import { shallowEqual } from 'react-redux';
import { useSelector } from '../../services/hooks';
import { IOrder } from '../../utils/types';
import FeedItemCard from '../feed-item-card/feed-item-card';
import styles from './feed-list.module.css';

const FeedList: FC = () => {
  const { orders } = useSelector((store) => store.ws.messages, shallowEqual);

  return (
    <div className={styles.container}>
      <h3 className={`text text_type_main-large ${styles.title}`}>Лента заказов</h3>
      <ul className={styles.list}>
        {orders.map((order: IOrder) => (
          <li className={styles.listItem} key={order._id}>
            <FeedItemCard item={order} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FeedList;
