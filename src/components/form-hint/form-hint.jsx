import React from 'react';
import {
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './form-hint.module.css';

export default function FormHint({ text, btnText }) {
  return (
    <p className={`${styles.hint} text_color_inactive`}>
      {text}
      <span className={styles.btnSecondaryWrapper}>
        <Button
          // disabled={!orderItemsIds.length}
          type="secondary"
        // onClick={handlePlaceOrder}
        >
          {btnText}
        </Button>
      </span>
    </p>
  )
}