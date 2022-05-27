import React, { useCallback, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { defineCurrentIngredient, showIngredientModal } from "../../services/actions";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";

export default function IngredientDetailedModal() {
  const dispatch = useDispatch();
  const history = useHistory();

  const onClose = useCallback(() => {
      history.goBack();
      dispatch(defineCurrentIngredient({}));
      dispatch(showIngredientModal(false));
  }, [history, dispatch]);

  useEffect(() => {
    dispatch(showIngredientModal(true));
  }, [])

  return (
    <Modal
      title="Детали ингредиента"
      onClose={onClose}
    >
      <IngredientDetails />
    </Modal>
  )
}