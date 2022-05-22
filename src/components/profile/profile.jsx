import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { editProfile } from '../../services/actions/auth';
import FormEditProfile from '../form-edit-profile/form-edit-profile';
import styles from './profile.module.css';

export default function Profile() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const handleEditProfile = useCallback(
    (e, form) => {
      e.preventDefault();
      dispatch(editProfile(form));
    },
    [editProfile, dispatch]
  );
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <nav className={styles.menu}>
          <Link
            to="/profile"
            className={`text text_type_main-medium ${styles.link} ${pathname === "/profile" ? styles.isActive : ""}`}>
              Профиль
          </Link>
          <Link
            to="/profile/orders"
            className={`text text_type_main-medium ${styles.link} ${pathname === "/profile/orders" ? styles.isActive : ""}`}>
              История заказов
            </Link>
          <button className={`text text_type_main-medium ${styles.btn}`}>
            <p className={`text text_type_main-medium ${styles.btnText}`}>Выйти</p>
          </button>
        </nav>
        <p className={`text text_type_main-default ${styles.info}`}>
          В этом разделе вы можете
          изменить свои персональные данные
        </p>
      </div>
      <FormEditProfile onBtnClick={handleEditProfile} />
    </div>
  )
}
