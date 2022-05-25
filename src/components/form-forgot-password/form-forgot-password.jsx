import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Input
} from '@ya.praktikum/react-developer-burger-ui-components';
import Form from '../form/form';
import styles from './form-forgot-password.module.css';
import FormHint from '../form-hint/form-hint';

export default function FormForgotPassword({ onSubmit }) {
  const [form, setValue] = useState({ email: '' });

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Form
      formName="form-forgot-password"
      title="Восстановление пароля"
      submitBtnTitle="Восстановить"
      onSubmit={(e) => onSubmit(e, form)}
      inputs={
        <Input
          name="email"
          type="email"
          placeholder="Укажите e-mail"
          value={form.email}
          onChange={onChange}
        />
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

FormForgotPassword.propTypes = {
  onSubmit: PropTypes.func.isRequired
};