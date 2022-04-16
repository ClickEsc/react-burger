import React from 'react';
import { 
  Logo, 
  BurgerIcon, 
  CheckMarkIcon, 
  ProfileIcon 
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-nav.module.css';

function AppNav() {
  return (
    <nav className={styles.nav}>
      <div className={styles.container}>

        <div className={styles.wrapper}>
          <div className={styles.btn}>
            <BurgerIcon type="primary" />
            <p className="text text_type_main-default">Конструктор</p>
          </div>
          <div className={styles.btn}>
            <CheckMarkIcon type="secondary" />
            <p className={`text text_type_main-default ${styles.secondary}`}>Лента заказов</p>
          </div>
        </div>

        <div className={styles.wrapperLogo}>
          <Logo />
        </div>

        <div className={styles.wrapperEnd}>
          <div className={styles.btn}>
          <ProfileIcon type="secondary" />
          <p className={`text text_type_main-default ${styles.secondary}`}>Личный кабинет</p>
          </div>
        </div>

      </div>
    </nav>
  );
}

export default AppNav;
