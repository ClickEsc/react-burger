import React, { FC, useEffect } from 'react';
import { shallowEqual } from 'react-redux';
import { wsConnectionClose, wsConnectionStart } from '../../services/actions/wsActions';
import { useDispatch, useSelector } from '../../services/hooks';
import { getCookie } from '../../services/utils';
import { IOrder } from '../../utils/types';
import FeedItemCard from '../feed-item-card/feed-item-card';
import styles from './profile-orders.module.css';

const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((store) => store.ws.messages, shallowEqual);
  const { user } = useSelector((store) => store.auth, shallowEqual);

  useEffect(() => {
    if (user.isAuthorized) {
      const accessToken = getCookie('accessToken');
      const wsToken = accessToken && accessToken.replace('Bearer ', '');
      dispatch(wsConnectionStart(`?token=${wsToken}`));

      return () => {
        setTimeout(() => dispatch(wsConnectionClose()), 600);
      }
    }
  }, [dispatch, user.isAuthorized]);

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {orders.map((order: IOrder) => (
          <li className={styles.listItem} key={order._id}>
            <FeedItemCard item={order} hasStatus />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProfileOrders;
