import React from 'react';
import PropTypes from 'prop-types';
import { 
  Counter,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredient-card.module.css';

function BurgerIngredientCard({ image, price, name }) {
  return (
    <div className={styles.card}>
      <div className={styles.counter}>
        {(name === "Краторная булка N-200i" || name === "Соус традиционный галактический") &&
          <Counter count={1} size="default" />
        }
      </div>
      
      <div className={styles.wrapper}>
        <img className={styles.image} src={image} alt="Изображение ингредиента" />
        <p className={`text text_type_digits-default ${styles.price}`}>
          {price}
          <span className={styles.currency}><CurrencyIcon type="primary" /></span>
        </p>
      </div>

      <div>
        <h4 className={`text text_type_main-default ${styles.title}`}>{name}</h4>
      </div>
    </div>
  );
}

BurgerIngredientCard.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    image: PropTypes.string,
    price: PropTypes.number,
    name: PropTypes.string,
  }))
};

export default BurgerIngredientCard;
