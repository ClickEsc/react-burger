import React from 'react';
import { Link } from 'react-router-dom';
import FormEditProfile from '../form-edit-profile/form-edit-profile';
import styles from './profile.module.css';

export default function Profile() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <nav className={styles.menu}>
          <Link to="/profile" className={`text text_type_main-medium ${styles.link} ${styles.isActive}`}>Профиль</Link>
          <Link to="/profile/orders" className={`text text_type_main-medium ${styles.link}`}>История заказов</Link>
          <button className={`text text_type_main-medium ${styles.btn}`}>
            <p className={`text text_type_main-medium ${styles.btnText}`}>Выйти</p>
          </button>
        </nav>
        <p className={`text text_type_main-default ${styles.info}`}>
          В этом разделе вы можете
          изменить свои персональные данные
        </p>
      </div>
      <FormEditProfile />
    </div>
  )
}
