import React from 'react';
import { createPortal } from 'react-dom';
import { 
  CloseIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.css';

function Modal({ title, isOpen, onClose, children }) {
  if (!isOpen) return null
  return createPortal(
    <ModalOverlay>
      <div className={styles.modal}>
        <div className={styles.header}>
          {title && <h3 className={`text text_type_main-large ${styles.title}`}>{title}</h3>}
          <button className={styles.btnClose} onClick={onClose}>
            <CloseIcon type="primary" />
          </button>
        </div>
        {children}
      </div>
    </ModalOverlay>,
    document.getElementById('modal'))
}

Modal.propTypes = {
  title: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element
};

Modal.defaultProps = {
  title: '',
  isOpen: false,
  onClose: PropTypes.func,
  children: PropTypes.element
};

export default Modal;