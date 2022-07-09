import React, { FC, useState, useEffect } from 'react';
import { shallowEqual } from 'react-redux';
import { useSelector } from '../../services/hooks';
import { IOrder } from '../../utils/types';
import styles from './feed-statistics.module.css';

const FeedStatistics: FC = () => {
  const ordersInfo = useSelector((store) => store.ws.messages, shallowEqual);
  const ordersDone = ordersInfo.orders.filter((item) => item.status === 'done');
  const ordersPending = ordersInfo.orders.filter((item) => item.status !== 'done');
  const [columnsDone, setColumnsDone] = useState<Array<string>>([]);
  const [columnsPending, setColumnsPending] = useState<Array<string>>([]);
  const MAX = 10;

  const setColumns = (list: Array<IOrder>, max: number) => {
    const columnsQuantity = Math.ceil(list.length / max);
    const arr: Array<string> = [];
    for (let i = 0; i < columnsQuantity; i++) {
      arr.push(`col_${i}`);
    }
    return arr;
  }

  useEffect(() => {
    if (ordersDone.length > 0) {
      setColumnsDone(setColumns(ordersDone, MAX));
    }
  }, [ordersDone]);

  useEffect(() => {
    if (ordersPending.length > 0) {
      setColumnsPending(setColumns(ordersPending, MAX));
    }
  }, [ordersPending]);

  return (
    <div className={styles.statistics}>
      <div className={styles.orders}>
        <div className={styles.column}>
          <p className={`text text_type_main-medium ${styles.title}`}>Готовы:</p>
          <div className={styles.columns}>
            {columnsDone.map((el, index) => (
              <ul key={index} className={styles.list}>
                {ordersDone.splice(0, MAX).map((item) => (
                  <li key={item._id}>
                    <p className={`text text_type_digits-default ${styles.numberDone}`}>
                      {item.number}
                    </p>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
        <div className={styles.column}>
          <p className={`text text_type_main-medium ${styles.title}`}>В работе</p>
          {columnsPending.map((el, index) => (
            <ul key={index} className={styles.list}>
              {ordersPending.splice(0, MAX).map((item) => (
                <li key={item._id}>
                  <p className={`text text_type_digits-default ${styles.number}`}>
                    {item.number}
                  </p>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      <div className={styles.all}>
        <p className="text text_type_main-medium">Выполнено за всё время:</p>
        <p className={`text text_type_digits-large ${styles.total}`}>{ordersInfo.total}</p>
      </div>
      <div>
        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
        <p className={`text text_type_digits-large ${styles.total}`}>{ordersInfo.totalToday}</p>
      </div>
    </div>
  );
}

export default FeedStatistics;