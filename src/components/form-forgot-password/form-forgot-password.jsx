import React from 'react';
import {
  Input
} from '@ya.praktikum/react-developer-burger-ui-components';
import Form from '../form/form';
import styles from './form-forgot-password.module.css';
import FormHint from '../form-hint/form-hint';

export default function FormForgotPassword() {
  return (
    <Form
      formName="form-forgot-password"
      title="Восстановление пароля"
      btnTitle="Восстановить"
      inputs={
        <Input type="email" placeholder="Укажите e-mail" />
      }
      extra={
        <FormHint text="Вспомнили пароль?" btnText="Войти" />
      }
    />
  )
}