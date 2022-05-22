import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './form-hint.module.css';

export default function FormHint({ text, linkTo, btnText }) {
  return (
    <p className={`${styles.hint} text_color_inactive`}>
      {text}
      <span className={styles.btnSecondaryWrapper}>
        <Link to={linkTo}>
          <Button
            // disabled={!orderItemsIds.length}
            type="secondary"
          // onClick={handlePlaceOrder}
          >
            {btnText}
          </Button>
        </Link>
      </span>
    </p>
  )
}