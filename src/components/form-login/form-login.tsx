import React, { FC, FormEvent, ReactNode, useState } from 'react';
import {
  Input
} from '@ya.praktikum/react-developer-burger-ui-components';
import Form from '../form/form';
import FormHint from '../form-hint/form-hint';

const FormLogin: FC<{ onSubmit: (event: FormEvent<HTMLFormElement>, form: ReactNode) => void }> = ({ onSubmit }) => {
  const [form, setValue] = useState<{ email: string, password: string }>({ email: '', password: '' });
  const [isValueVisible, setIsValueVisible] = useState<boolean>(false);

  const onChange = (e: { target: { name: string, value: string }}) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const handleIconClick = () => {
    setIsValueVisible(!isValueVisible);
  }

  return (
    <Form
      formName="form-login"
      title="Вход"
      submitBtnTitle="Войти"
      onSubmit={(event: FormEvent<HTMLFormElement>) => onSubmit(event, form)}
      inputs={
        <>
          <Input
            name="email"
            type="email"
            placeholder="E-mail"
            value={form.email}
            onChange={onChange}
          />
          <Input
            name="password"
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

export default FormLogin;