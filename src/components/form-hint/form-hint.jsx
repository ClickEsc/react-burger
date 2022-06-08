import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './form-hint.module.css';

export default function FormHint({ text, linkTo, btnText }) {
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

FormHint.propTypes = {
  text: PropTypes.string.isRequired,
  linkTo: PropTypes.string.isRequired,
  btnText: PropTypes.string.isRequired
};