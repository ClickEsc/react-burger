import React from 'react';
import { Link } from 'react-router-dom';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-nav.module.css';

function AppNav() {
  return (
    <nav className={styles.nav}>
      <div className={styles.container}>

        <div className={styles.wrapper}>
          <Link to="/" className={styles.link}>
            <BurgerIcon type="primary" />
            <p className={`text text_type_main-default ${styles.primary}`}>Конструктор</p>
          </Link>
          <Link to="/profile/orders" className={styles.link}>
            <ListIcon type="secondary" />
            <p className={`text text_type_main-default ${styles.secondary}`}>Лента заказов</p>
          </Link>
        </div>

        <div className={styles.wrapperLogo}>
          <Logo />
        </div>

        <div className={styles.wrapperEnd}>
          <Link to="/profile" className={styles.link}>
            <ProfileIcon type="secondary" />
            <p className={`text text_type_main-default ${styles.secondary}`}>Личный кабинет</p>
          </Link>
        </div>

      </div>
    </nav>
  );
}

export default AppNav;
