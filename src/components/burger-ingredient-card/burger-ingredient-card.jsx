import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { 
  Counter,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import styles from './burger-ingredient-card.module.css';

function BurgerIngredientCard({ 
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

  useEffect(() => {
    function handleEscapeKey(e) {
      if (e.code === 'Escape') {
        setIsModalOpen(false);
      }
    }
  
    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    }
  }, []);

  useEffect(() => {
    function handleOverlayClick(e) {
      if (isModalOpen && e.target !== e.currentTarget) {
        setIsModalOpen(false);
      }
    }

    document.addEventListener('click', handleOverlayClick);
    return () => {
      document.removeEventListener('click', handleOverlayClick);
    }
  }, [isModalOpen]);

  return (
    <>
      <div className={styles.card} onClick={toggleModal}>
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
      <Modal title="Детали ингредиента" isOpen={isModalOpen} onClose={toggleModal}>
        <IngredientDetails 
          image={image}
          title={name}
          calories={calories}
          proteins={proteins}
          fat={fat}
          carbohydrates={carbohydrates}
        />
    </Modal>
  </>
  );
}

BurgerIngredientCard.propTypes = {
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  calories: PropTypes.number.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired
};

export default BurgerIngredientCard;
