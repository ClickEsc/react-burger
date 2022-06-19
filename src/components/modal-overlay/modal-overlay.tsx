import React, { FC } from 'react';
import styles from './modal-overlay.module.css';

const ModalOverlay: FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className={styles.overlay} onClick={onClose} />
  )
}

export default ModalOverlay;