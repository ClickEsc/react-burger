import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Counter,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import { defineCurrentIngredient } from '../../services/actions';
import { ingredientPropTypes } from '../../utils/types';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import styles from './burger-ingredient-card.module.css';

function BurgerIngredientCard({ item }) {
  const dispatch = useDispatch();
  const { __v: count, image, price, name } = item;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    dispatch(defineCurrentIngredient(item))
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
        <Modal
          title="Детали ингредиента"
          onClose={() => {
              toggleModal();
              dispatch(defineCurrentIngredient({}));
            }
          }>
          <IngredientDetails
            item={item}
          />
        </Modal>
      }
    </>
  );
}

BurgerIngredientCard.propTypes = {
  item: ingredientPropTypes.isRequired
};

export default BurgerIngredientCard;
