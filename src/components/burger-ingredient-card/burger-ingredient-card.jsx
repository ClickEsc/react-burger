import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Counter,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import styles from './burger-ingredient-card.module.css';

function BurgerIngredientCard({
  count,
  image,
  price,
  name,
  calories,
  proteins,
  fat,
  carbohydrates
}) {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  }

  return (
    <>
      <div className={styles.card} onClick={toggleModal}>
        <div className={styles.counter}>
            {count > 0 ? <Counter count={count} size="default" /> : <></>}
        </div>

        <div className={styles.wrapper}>
          <img className={styles.image} src={image} alt={`${name}`} />
          <p className={`text text_type_digits-default ${styles.price}`}>
            {price}
            <span className={styles.currency}><CurrencyIcon type="primary" /></span>
          </p>
        </div>

        <div>
          <h4 className={`text text_type_main-default ${styles.title}`}>{name}</h4>
        </div>
      </div>
      {isModalOpen &&
        <Modal title="Детали ингредиента" onClose={toggleModal}>
          <IngredientDetails
            image={image}
            title={name}
            calories={calories}
            proteins={proteins}
            fat={fat}
            carbohydrates={carbohydrates}
          />
        </Modal>
      }
    </>
  );
}

BurgerIngredientCard.propTypes = {
  count: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  calories: PropTypes.number.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired
};

export default BurgerIngredientCard;
