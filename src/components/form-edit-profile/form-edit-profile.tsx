import React, { FC, FormEvent, useEffect, useState } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import {
  Input
} from '@ya.praktikum/react-developer-burger-ui-components';
import Form from '../form/form';

const FormEditProfile: FC<{ onSubmit: (e: FormEvent<HTMLFormElement>, form: HTMLFormElement) => void }> = ({ onSubmit }) => {
  const { user } = useSelector((store: { auth: any }) => store.auth, shallowEqual);
  const [form, setValue] = useState<{ name: string, email: string, password: string }>({ name: '', email: '', password: '' });
  const [isNameValueVisible, setIsNameValueVisible] = useState<boolean>(false);
  const [isEmailValueVisible, setIsEmailValueVisible] = useState<boolean>(false);
  const [isPasswordValueVisible, setIsPasswordValueVisible] = useState<boolean>(false);

  const onChange = (e: { target: { name: string, value: string }}) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const onCancel = (e: KeyboardEvent) => {
    e.preventDefault();
    setValue({ ...form, name: user.name, email: user.email, password: user.password });
  };

  const handleNameIconClick = () => {
    if (!isNameValueVisible) {
      setValue({ ...form, name: user.name })
    } else {
      setValue({ ...form, name: '' })
    }
    setIsNameValueVisible(!isNameValueVisible);
  }

  const handleEmailIconClick = () => {
    if (!isEmailValueVisible) {
      setValue({ ...form, email: user.email})
    } else {
      setValue({ ...form, email: '' })
    }
    setIsEmailValueVisible(!isEmailValueVisible);
  }

  const handlePasswordIconClick = () => {
    if (!isPasswordValueVisible) {
      setValue({ ...form, password: user.password})
    } else {
      setValue({ ...form, password: '' })
    }
    setIsPasswordValueVisible(!isPasswordValueVisible);
  }

  useEffect(() => {
    if (user.isAuthorized) {
      setValue({
        name: user.name,
        email: user.email,
        password: user.password
      })
    }
  }, [user.isAuthorized])

  return (
    <Form
      formName="form-edit-profile"
      submitBtnTitle="Сохранить"
      onSubmit={(e: FormEvent<HTMLFormElement>, form: HTMLFormElement) => onSubmit(e, form)}
      hasCancel
      onCancel={(e: KeyboardEvent) => onCancel(e)}
      inputs={
        <>
          <Input
            name="name"
            type="text"
            placeholder="Имя"
            icon={isNameValueVisible ? "CloseIcon" : "EditIcon"}
            onIconClick={handleNameIconClick}
            value={form.name}
            onChange={onChange}
          />
          <Input
            name="email"
            type="email"
            placeholder="Логин"
            icon={isEmailValueVisible ? "CloseIcon" : "EditIcon"}
            onIconClick={handleEmailIconClick}
            value={form.email}
            onChange={onChange}
          />
          <Input
            name="password"
            type={isPasswordValueVisible ? "text" : "password"}
            placeholder="Пароль"
            icon={isPasswordValueVisible ? "CloseIcon" : "EditIcon"}
            onIconClick={handlePasswordIconClick}
            value={form.password}
            onChange={onChange}
          />
        </>
      }
    />
  )
}

export default FormEditProfile;