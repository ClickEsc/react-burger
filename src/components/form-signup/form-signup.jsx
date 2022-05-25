import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Input
} from '@ya.praktikum/react-developer-burger-ui-components';
import Form from '../form/form';
import styles from './form-signup.module.css';
import FormHint from '../form-hint/form-hint';

export default function FormSignup({ onSubmit }) {
  const [form, setValue] = useState({ name: '', email: '', password: '' });

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const [isValueVisible, setIsValueVisible] = useState(false);

  const handleIconClick = () => {
    setIsValueVisible(!isValueVisible);
  }

  return (
    <Form
      formName="form-signup"
      title="Регистрация"
      submitBtnTitle="Зарегистрироваться"
      onSubmit={(e) => onSubmit(e, form)}
      inputs={
        <>
          <Input
            name="name"
            type="text"
            placeholder="Имя"
            value={form.name}
            onChange={onChange}
          />
          <Input
            name="email"
            type="email"
            placeholder="E-mail"
            value={form.email}
            onChange={onChange}
          />
          <Input
            name="password"
            style={{ width: "480px" }}
            className={styles.input}
            type={isValueVisible ? "text" : "password"}
            placeholder="Пароль"
            icon={isValueVisible ? "HideIcon" : "ShowIcon"}
            onIconClick={handleIconClick}
            value={form.password}
            onChange={onChange}
          />
        </>
      }
      extra={
        <FormHint
          text="Уже зарегистрированы?"
          linkTo="/login"
          btnText="Войти"
        />
      }
    />
  )
}

FormSignup.propTypes = {
  onSubmit: PropTypes.func.isRequired
};