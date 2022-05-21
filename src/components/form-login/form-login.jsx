import React, { useState } from 'react';
import {
  Input,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import Form from '../form/form';
import styles from './form-login.module.css';
import FormHint from '../form-hint/form-hint';

export default function FormLogin() {
  const [isValueVisible, setIsValueVisible] = useState(false);

  const handleIconCLick = () => {
    setIsValueVisible(!isValueVisible);
  }

  return (
    <Form
      formName="form-login"
      title="Вход"
      btnTitle="Войти"
      inputs={
        <>
          <Input type="email" placeholder="E-mail" />
          <Input
            required
            style={{ width: "480px"}}
            className={styles.input}
            type={isValueVisible ? "text" : "password"}
            placeholder="Пароль"
            icon="ShowIcon"
            onIconClick={handleIconCLick}
          />
        </>
      }
      extra={
        <>
          <FormHint text="Вы — новый пользователь?" btnText="Зарегистрироваться" />
          <FormHint text="Забыли пароль?" btnText="Восстановить пароль" />
        </>
      }
    />
  )
}