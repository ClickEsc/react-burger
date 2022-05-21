import React, { useState } from 'react';
import {
  Input
} from '@ya.praktikum/react-developer-burger-ui-components';
import Form from '../form/form';
import styles from './form-signup.module.css';
import FormHint from '../form-hint/form-hint';

export default function FormSignup() {
  const [isValueVisible, setIsValueVisible] = useState(false);

  const handleIconCLick = () => {
    setIsValueVisible(!isValueVisible);
  }

  return (
    <Form
      formName="form-signup"
      title="Регистрация"
      btnTitle="Зарегистрироваться"
      inputs={
        <>
          <Input type="text" placeholder="Имя" />
          <Input type="email" placeholder="E-mail" />
          <Input
            required
            style={{ width: "480px" }}
            className={styles.input}
            type={isValueVisible ? "text" : "password"}
            placeholder="Пароль"
            icon="ShowIcon"
            onIconClick={handleIconCLick}
          />
        </>
      }
      extra={
        <FormHint text="Уже зарегистрированы?" btnText="Войти" />
      }
    />
  )
}