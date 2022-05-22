import React, { useState } from 'react';
import {
  Input,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import Form from '../form/form';
import styles from './form-login.module.css';
import FormHint from '../form-hint/form-hint';

export default function FormLogin({ onBtnClick }) {
  const [form, setValue] = useState({ email: '', password: '' });
  const [isValueVisible, setIsValueVisible] = useState(false);

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const handleIconCLick = () => {
    setIsValueVisible(!isValueVisible);
  }

  return (
    <Form
      formName="form-login"
      title="Вход"
      btnTitle="Войти"
      onBtnClick={(e) => onBtnClick(e, form)}
      inputs={
        <>
          <Input
            name="email"
            type="email"
            placeholder="E-mail"
            onChange={onChange}
          />
          <Input
            name="password"
            style={{ width: "480px"}}
            className={styles.input}
            type={isValueVisible ? "text" : "password"}
            placeholder="Пароль"
            icon="ShowIcon"
            onIconClick={handleIconCLick}
            onChange={onChange}
          />
        </>
      }
      extra={
        <>
          <FormHint
            text="Вы — новый пользователь?"
            linkTo="/register"
            btnText="Зарегистрироваться"
          />
          <FormHint
            text="Забыли пароль?"
            linkTo="/forgot-password"
            btnText="Восстановить пароль"
          />
        </>
      }
    />
  )
}