import React, { useEffect, useState, useRef } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Input
} from '@ya.praktikum/react-developer-burger-ui-components';
import Form from '../form/form';
import styles from './form-edit-profile.module.css';

export default function FormEditProfile({ onSubmit }) {
  const { user } = useSelector(store => store.auth, shallowEqual);
  const [form, setValue] = useState({ name: '', email: '', password: '' });
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isNameValueVisible, setIsNameValueVisible] = useState(false);
  const [isEmailValueVisible, setIsEmailValueVisible] = useState(false);
  const [isPasswordValueVisible, setIsPasswordValueVisible] = useState(false);

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const onCancel = e => {
    e.preventDefault();
    setValue({ ...form, name: user.name, email: user.email, password: user.password });
  };

  const setFocus = (ref) => {
    ref.current.focus()
  }

  const handleBlur = (ref) => {
    const name = ref.current.name;
    const value = ref.current.value;
    console.log(value)
    if (value === '') {
      setValue({ ...form, [name]: user[name] });
    }
  }

  const handleNameIconClick = () => {
    setFocus(nameInputRef);
    if (!isNameValueVisible) {
      setValue({ ...form, name: user.name })
    } else {
      setValue({ ...form, name: '' })
    }
    setIsNameValueVisible(!isNameValueVisible);
  }

  const handleEmailIconClick = () => {
    setFocus(emailInputRef);
    if (!isEmailValueVisible) {
      setValue({ ...form, email: user.email})
    } else {
      setValue({ ...form, name: '' })
    }
    setIsEmailValueVisible(!isEmailValueVisible);
  }

  const handlePasswordIconClick = () => {
    setFocus(passwordInputRef);
    if (!isPasswordValueVisible) {
      setValue({ ...form, email: user.email})
    } else {
      setValue({ ...form, name: '' })
    }
    setIsPasswordValueVisible(!isPasswordValueVisible);
  }

  useEffect(() => {
    setValue({
      name: user.name,
      email: user.email,
      password: user.password
    })
  }, [user])

  return (
    <Form
      formName="form-edit-profile"
      submitBtnTitle="Сохранить"
      onSubmit={(e) => onSubmit(e, form)}
      hasCancel
      onCancel={(e) => onCancel(e)}
      inputs={
        <>
          <Input
            ref={nameInputRef}
            name="name"
            type="text"
            placeholder="Имя"
            icon={isNameValueVisible ? "CloseIcon" : "EditIcon"}
            onIconClick={handleNameIconClick}
            onBlur={() => handleBlur(nameInputRef)}
            value={form.name}
            onChange={onChange}
          />
          <Input
            ref={emailInputRef}
            name="email"
            type="email"
            placeholder="Логин"
            icon={isEmailValueVisible ? "CloseIcon" : "EditIcon"}
            onIconClick={handleEmailIconClick}
            onBlur={() => handleBlur(emailInputRef)}
            value={form.email}
            onChange={onChange}
          />
          <Input
            ref={passwordInputRef}
            name="password"
            style={{ width: "480px"}}
            className={styles.input}
            type={isPasswordValueVisible ? "text" : "password"}
            placeholder="Пароль"
            icon={isPasswordValueVisible ? "CloseIcon" : "EditIcon"}
            onIconClick={handlePasswordIconClick}
            onBlur={() => handleBlur(passwordInputRef)}
            value={form.password}
            onChange={onChange}
          />
        </>
      }
    />
  )
}

FormEditProfile.propTypes = {
  onSubmit: PropTypes.func.isRequired
};