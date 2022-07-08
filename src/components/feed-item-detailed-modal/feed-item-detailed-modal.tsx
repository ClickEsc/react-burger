import React, { FC, useCallback, useEffect } from "react";
import { useDispatch } from '../../services/hooks';
import { useHistory } from 'react-router-dom';
import { defineCurrentIngredient, showIngredientModal } from "../../services/actions";
import Modal from "../modal/modal";
import FeedItemDetails from "../feed-item-details/feed-item-details";

const FeedItemDetailedModal: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory<History>();

  const onClose = useCallback(() => {
      history.goBack();
      dispatch(defineCurrentIngredient(null));
      dispatch(showIngredientModal(false));
  }, [history, dispatch]);

  useEffect(() => {
    dispatch(showIngredientModal(true));
  }, [])

  return (
    <Modal
      onClose={onClose}
    >
      <FeedItemDetails />
    </Modal>
  )
}

export default FeedItemDetailedModal;