import React from 'react';
import PropTypes from 'prop-types';
import { 
  DragIcon,
  CurrencyIcon,
  LockIcon,
  DeleteIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor-item.module.css';

function BurgerConstructorItem({ image, price, name, contentStyle, locked }) {
  return (
    <div className={styles.item}>
      <div className={styles.wrapper}>

        <button className={styles.buttonDrag}>
          {contentStyle === "content" && <DragIcon type="primary" />}
        </button>

        <div className={styles[contentStyle]}>
          <img className={styles.image} src={image} alt="Изображение ингредиента" />
          <h4 className={`text text_type_main-default ${styles.title}`}>{name}</h4>
          <p className={`text text_type_digits-default ${styles.price}`}>
            {price}
            <span className={styles.currency}><CurrencyIcon type="primary" /></span>
          </p>
          {  locked ?
              <button className={styles.button}><LockIcon type="secondary" /></button>
            :
              <button className={styles.button}><DeleteIcon type="primary" /></button>
          }
          </div>

        </div>
    </div>
  );
}

BurgerConstructorItem.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    image: PropTypes.string,
    price: PropTypes.number,
    name: PropTypes.string,
    contentStyle: PropTypes.string,
    locked: PropTypes.boolean,
  }))
};

export default BurgerConstructorItem;
