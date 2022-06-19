import React, { FC, FormEvent, ReactNode, useState } from 'react';
import {
  Input
} from '@ya.praktikum/react-developer-burger-ui-components';
import Form from '../form/form';
import FormHint from '../form-hint/form-hint';

const FormForgotPassword: FC<{ onSubmit: (event: FormEvent<HTMLFormElement>, form: ReactNode) => void }> = ({ onSubmit }) => {
  const [form, setValue] = useState<{ email: string }>({ email: '' });

  const onChange = (e: { target: { name: string, value: string }}) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Form
      formName="form-forgot-password"
      title="Восстановление пароля"
      submitBtnTitle="Восстановить"
      onSubmit={(event: FormEvent<HTMLFormElement>) => onSubmit(event, form)}
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

export default FormForgotPassword;