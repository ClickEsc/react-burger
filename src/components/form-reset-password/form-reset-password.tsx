import React, { FC, FormEvent, ReactNode, useState } from 'react';
import {
  Input
} from '@ya.praktikum/react-developer-burger-ui-components';
import Form from '../form/form';
import FormHint from '../form-hint/form-hint';

const FormResetPassword: FC<{ onSubmit: (event: FormEvent<HTMLFormElement>, form: ReactNode) => void }> = ({ onSubmit }) => {
  const [form, setValue] = useState<{ password: string, token: string }>({ password: '', token: '' });
  const [isValueVisible, setIsValueVisible] = useState<boolean>(false);

  const onChange = (e: { target: { name: string, value: string }}) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const handleIconClick = () => {
    setIsValueVisible(!isValueVisible);
  }

  return (
    <Form
      formName="form-reset-password"
      title="Восстановление пароля"
      submitBtnTitle="Сохранить"
      onSubmit={(e: FormEvent<HTMLFormElement>, form: HTMLFormElement) => onSubmit(e, form)}
      inputs={
        <>
          <Input
            name="password"
            type={isValueVisible ? "text" : "password"}
            placeholder="Введите новый пароль"
            icon={isValueVisible ? "HideIcon" : "ShowIcon"}
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

export default FormResetPassword;