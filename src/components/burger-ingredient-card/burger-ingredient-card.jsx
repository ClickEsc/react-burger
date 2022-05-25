import React, { useState, useCallback } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import {
  Counter,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import { defineCurrentIngredient, showIngredientModal } from '../../services/actions';
import { ingredientPropTypes } from '../../utils/types';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import styles from './burger-ingredient-card.module.css';

function BurgerIngredientCard({ item }) {
  let { pathname } = useLocation();
  const dispatch = useDispatch();
  const { isIngredientModalVisible } = useSelector(store => store.app, shallowEqual);
  const history = useHistory();
  const { _id, __v: count, image, price, name } = item;
  const [isModalOpen, setIsModalOpen] = useState(false);

  // console.log(pathname)

  const toggleModal = () => {
    // history.push(`/ingredients/${_id}`);
    setIsModalOpen(!isModalOpen);
    dispatch(defineCurrentIngredient(item));
  }

  const handleModal = useCallback(
    (e) => {
      e.preventDefault();
      console.log(window.location)
      // history.push(`/ingredients/${_id}`);
      // window.location.pushState(null, null, pathname.replace('/', `/ingredients/${_id}`));
      dispatch(defineCurrentIngredient(item));
      dispatch(showIngredientModal(!isIngredientModalVisible));
      // window.location.pathname = `/ingredients/${_id}`
      // history.push(`/ingredients/${_id}`);
      // history.replace({ pathname: `/ingredients/${_id}`, search: '', isActive: true })
      const location = window.location.assign(`/ingredients/${_id}`);
      Object.freeze(pathname)
    }, [showIngredientModal, isIngredientModalVisible, dispatch]);

  return (
    <>
      <div className={styles.card} onClick={(e) => handleModal(e)}>
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
      {isIngredientModalVisible &&
        <Modal
          title="Детали ингредиента"
          onClose={(e) => {
              handleModal(e);
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
