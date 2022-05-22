import React from 'react';
import { Link,  useLocation } from 'react-router-dom';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-nav.module.css';

function AppNav() {
  const { pathname } = useLocation();
  return (
    <nav className={styles.nav}>
      <div className={styles.container}>

        <div className={styles.wrapper}>
          <Link to="/" className={styles.link}>
            <BurgerIcon type={pathname === "/" ? "primary" : "secondary"} />
            <p className={`text text_type_main-default ${pathname === "/" ? styles.primary : styles.secondary}`}>Конструктор</p>
          </Link>
          <Link to="/profile/orders" className={styles.link}>
            <ListIcon type={pathname === "/profile/orders" ? "primary" : "secondary"} />
            <p className={`text text_type_main-default ${pathname === "/profile/orders" ? styles.primary : styles.secondary}`}>Лента заказов</p>
          </Link>
        </div>

        <div className={styles.wrapperLogo}>
          <Logo />
        </div>

        <div className={styles.wrapperEnd}>
          <Link to="/profile" className={styles.link}>
            <ProfileIcon type={pathname === "/profile" ? "primary" : "secondary"} />
            <p className={`text text_type_main-default ${pathname === "/profile" ? styles.primary : styles.secondary}`}>Личный кабинет</p>
          </Link>
        </div>

      </div>
    </nav>
  );
}

export default AppNav;
