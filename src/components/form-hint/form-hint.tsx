import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import {
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './form-hint.module.css';

const FormHint: FC<{ text: string, linkTo: string, btnText: string }> = ({ text, linkTo, btnText }) => {
  return (
    <p className={`${styles.hint} text text_type_main-default text_color_inactive`}>
      {text}
      <span className={styles.btnSecondaryWrapper}>
        <Link to={linkTo}>
          <Button type="secondary">
            {btnText}
          </Button>
        </Link>
      </span>
    </p>
  )
}

export default FormHint;