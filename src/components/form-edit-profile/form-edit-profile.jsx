import React, { useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  Input
} from '@ya.praktikum/react-developer-burger-ui-components';
import Form from '../form/form';
import styles from './form-edit-profile.module.css';

export default function FormEditProfile({ onBtnClick }) {
  const { user } = useSelector(store => store.auth, shallowEqual);
  const [form, setValue] = useState({ name: '', email: '', password: '' });
  const [isValueVisible, setIsValueVisible] = useState(false);

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const handleIconClick = () => {
    setIsValueVisible(!isValueVisible);
  }

  console.log(user)

  return (
    <Form
      formName="form-edit-profile"
      btnTitle="Сохранить"
      onBtnClick={(e) => onBtnClick(e, form)}
      inputs={
        <>
          <Input
            name="name"
            type="text"
            placeholder="Имя"
            icon="EditIcon"
            value={form.name}
            onChange={onChange}
          />
          <Input
            name="email"
            type="email"
            placeholder="Логин"
            icon="EditIcon"
            value={form.email}
            onChange={onChange}
          />
          <Input
            name="password"
            style={{ width: "480px"}}
            className={styles.input}
            type={isValueVisible ? "text" : "password"}
            placeholder="Пароль"
            icon="EditIcon"
            onIconClick={handleIconClick}
            value={form.password}
            onChange={onChange}
          />
        </>
      }
    />
  )
}