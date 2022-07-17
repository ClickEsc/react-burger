import React, { FC, ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  CloseIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.css';

const modalContainer: HTMLElement = document.getElementById('modal')!;

const Modal: FC<({ title?: string, onClose: () => void, children: ReactNode })> = ({ title, onClose, children }) => {
  useEffect(() => {
    function handleEscapeKey(e: KeyboardEvent) {
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
          {title ? <h3 className={`text text_type_main-large ${styles.title}`}>{title}</h3> : null}
          <button data-at="btn-close" className={styles.btnClose} onClick={onClose}>
            <CloseIcon type="primary" />
          </button>
        </div>
        <>{children}</>
      </div>
    </div>,
    modalContainer
  )
}

export default Modal;