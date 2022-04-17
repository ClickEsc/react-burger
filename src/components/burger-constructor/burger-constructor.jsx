import React from 'react';
import PropTypes from 'prop-types';
import BurgerConstructorItem from '../burger-constructor-item/burger-constructor-item';
import { ingredientPropTypes } from '../../utils/constants';
import styles from './burger-constructor.module.css';

function BurgerConstructor({ data }) {
  const bunOrder = data.filter(item => item.type === 'bun');
  const innerOrder = data.filter(item => item.type !== 'bun');
  const topLayer = bunOrder.filter((item, index) => index % 2 !== 0);
  const bottomLayer = bunOrder.filter((item, index) => index % 2 === 0);

  const renderItem = (arr, contentStyle, locked) => {
    return arr.map((item, index) => {
      const { _id, image, price, name } = item;
      return (
        <li key={`${_id + index}`} className={styles.listItem}>
          <BurgerConstructorItem image={image} price={price} name={name} contentStyle={contentStyle} locked={locked}/>
        </li>
      )
    })
  }

  return (
    <section className={styles.section}>
      <ul className={styles.list}>
        {renderItem(topLayer, 'topContent', true)}
        <li className={styles.listItem}>
          <ul className={styles.innerList}>
            {renderItem(innerOrder, 'content', false)}
          </ul>
        </li>
        {renderItem(bottomLayer, 'bottomContent', true)}

      </ul>
    </section>
  );
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientPropTypes)
};

export default BurgerConstructor;
