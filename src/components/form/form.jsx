import React from 'react';
import {
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './form.module.css';

export default function Form({ formName, title, inputs, btnTitle, extra }) {
  return (
    <form className={styles.form} name={formName}>
      <div className={styles.wrapper}>
        <h2 className={`${styles.title} text text_type_main-medium`}>{title}</h2>
        {inputs}
        <Button
          // disabled={}
          type="primary"
          size="large"
          // onClick={}
        >
          {btnTitle}
        </Button>
        <div className={styles.extra}>
          {extra}
        </div>
      </div>
    </form>
  )
}