import React, { useState } from 'react';
import {
  Input
} from '@ya.praktikum/react-developer-burger-ui-components';
import Form from '../form/form';
import styles from './form-reset-password.module.css';
import FormHint from '../form-hint/form-hint';

export default function FormResetPassword() {
  const [isValueVisible, setIsValueVisible] = useState(false);

  const handleIconCLick = () => {
    setIsValueVisible(!isValueVisible);
  }

  return (
    <Form
      formName="form-reset-password"
      title="Восстановление пароля"
      btnTitle="Сохранить"
      inputs={
        <>
          <Input
            required
            style={{ width: "480px" }}
            className={styles.input}
            type={isValueVisible ? "text" : "password"}
            placeholder="Введите новый пароль"
            icon="ShowIcon"
            onIconClick={handleIconCLick}
          />
          <Input type="text" placeholder="Введите код из письма" />
        </>
      }
      extra={
        <FormHint
          text="Вспомнили пароль?"
          linkTo="/login"
          btnText="Войти"
        />
      }
    />
  )
}