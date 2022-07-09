import React, { FC, FormEvent, useCallback } from 'react';
import { useDispatch } from '../../services/hooks';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { editProfile, logout } from '../../services/actions/auth';
import FormEditProfile from '../form-edit-profile/form-edit-profile';
import styles from './profile.module.css';
import ProfileOrders from '../profile-orders/profile-orders';

const Profile: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory<History>();
  const { pathname } = useLocation<Location>();

  const handleEditProfile = useCallback(
    (e: FormEvent<HTMLFormElement>, form: HTMLFormElement) => {
      e.preventDefault();
      dispatch(editProfile(form));
    },
    [editProfile, dispatch]
  );

  const handleLogout = useCallback(
    () => {
      dispatch(logout())
      setTimeout(() => history.push("/login"), 300)
    },
    [logout, dispatch]
  )

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
          <button
            className={`text text_type_main-medium ${styles.btn}`}
            onClick={handleLogout}
          >
            <p className={`text text_type_main-medium ${styles.btnText}`}>Выйти</p>
          </button>
        </nav>
        <p className={`text text_type_main-default ${styles.info}`}>
          В этом разделе вы можете
          изменить свои персональные данные
        </p>
      </div>
      {pathname === "/profile" && <FormEditProfile onSubmit={handleEditProfile} />}
      {pathname === "/profile/orders" && <ProfileOrders />}
    </div>
  )
}

export default Profile;