import React from 'react';
import PropTypes from 'prop-types';
import {
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './form.module.css';

export default function Form({
  formName,
  title,
  inputs,
  submitBtnTitle,
  onSubmit,
  hasCancel,
  onCancel,
  extra
}) {
  return (
    <form
      className={styles.form}
      name={formName}
      onSubmit={onSubmit}
    >
      <div className={styles.wrapper}>
        {title && <h2 className={`${styles.title} text text_type_main-medium`}>{title}</h2>}
        {inputs}
        <div className={styles.buttons}>
          {hasCancel && <Button
            type="secondary"
            size="medium"
            onClick={onCancel}
          >
            Отмена
          </Button>}
          <Button
            // disabled={}
            type="primary"
            size="large"
            onClick={onSubmit}
          >
            {submitBtnTitle}
          </Button>
        </div>
        <div className={styles.extra}>
          {extra}
        </div>
      </div>
    </form>
  )
}

Form.propTypes = {
  formName: PropTypes.string,
  title: PropTypes.string.isRequired,
  inputs: PropTypes.element.isRequired,
  submitBtnTitle: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  hasCancel: PropTypes.bool,
  onCancel: PropTypes.func,
  extra: PropTypes.element,
};

Form.defaultProps = {
  formName: '',
  hasCancel: false,
  onCancel: () => {},
  extra: <></>,
};