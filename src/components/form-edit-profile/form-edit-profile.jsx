import React, { useState } from 'react';
import {
  Input,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import Form from '../form/form';
import styles from './form-edit-profile.module.css';
import FormHint from '../form-hint/form-hint';

export default function FormEditProfile() {
  const [isValueVisible, setIsValueVisible] = useState(false);

  const handleIconCLick = () => {
    setIsValueVisible(!isValueVisible);
  }

  return (
    <Form
      formName="form-edit-profile"
      inputs={
        <>
          <Input
            type="text"
            placeholder="Имя"
            icon="EditIcon"
          />
          <Input
            type="email"
            placeholder="Логин"
            icon="EditIcon"
          />
          <Input
            required
            style={{ width: "480px"}}
            className={styles.input}
            type={isValueVisible ? "text" : "password"}
            placeholder="Пароль"
            icon="EditIcon"
            onIconClick={handleIconCLick}
          />
        </>
      }
    />
  )
}