import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import {
  CloseIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.css';

function Modal({ title, onClose, children }) {

  useEffect(() => {
    function handleEscapeKey(e) {
      if (e.code === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    }
  }, [onClose]);

  return createPortal(
    <div className={styles.modalContainer}>
      <ModalOverlay onClose={onClose} />
      <div className={styles.modalContent}>
        <div className={styles.header}>
          {title && <h3 className={`text text_type_main-large ${styles.title}`}>{title}</h3>}
          <button className={styles.btnClose} onClick={onClose}>
            <CloseIcon type="primary" />
          </button>
        </div>
        <>{children}</>
      </div>
    </div>,
    document.getElementById('modal'))
}

Modal.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
};

Modal.defaultProps = {
  title: ''
};

export default Modal;