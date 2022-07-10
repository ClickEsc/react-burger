import React, { FC, FormEvent, useState } from 'react';
import {
  Input
} from '@ya.praktikum/react-developer-burger-ui-components';
import Form from '../form/form';
import FormHint from '../form-hint/form-hint';

const FormSignup: FC<{ onSubmit: (e: FormEvent<HTMLFormElement>, form: { name: string; email: string; password: string; }) => void }> = ({ onSubmit }) => {
  const [form, setValue] = useState<{ name: string, email: string, password: string }>({ name: '', email: '', password: '' });
  const [isValueVisible, setIsValueVisible] = useState<boolean>(false);

  const onChange = (e: { target: { name: string, value: string }}) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const handleIconClick = () => {
    setIsValueVisible(!isValueVisible);
  }

  return (
    <Form
      formName="form-signup"
      title="Регистрация"
      submitBtnTitle="Зарегистрироваться"
      onSubmit={(e: FormEvent<HTMLFormElement>) => onSubmit(e, form)}
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

export default FormSignup;