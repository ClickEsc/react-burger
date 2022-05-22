import React, { useState } from 'react';
import {
  Input
} from '@ya.praktikum/react-developer-burger-ui-components';
import Form from '../form/form';
import styles from './form-reset-password.module.css';
import FormHint from '../form-hint/form-hint';

export default function FormResetPassword({ onBtnClick }) {
  const [form, setValue] = useState({ password: '', token: '' });
  const [isValueVisible, setIsValueVisible] = useState(false);

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const handleIconClick = () => {
    setIsValueVisible(!isValueVisible);
  }

  return (
    <Form
      formName="form-reset-password"
      title="Восстановление пароля"
      btnTitle="Сохранить"
      onBtnClick={(e) => onBtnClick(e, form)}
      inputs={
        <>
          <Input
            name="password"
            style={{ width: "480px" }}
            className={styles.input}
            type={isValueVisible ? "text" : "password"}
            placeholder="Введите новый пароль"
            icon="ShowIcon"
            onIconClick={handleIconClick}
            value={form.password}
            onChange={onChange}
          />
          <Input
            name="token"
            type="text"
            placeholder="Введите код из письма"
            value={form.token}
            onChange={onChange}
          />
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