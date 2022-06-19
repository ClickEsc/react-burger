import React, { FC } from 'react';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import styles from './main.module.css';

const Main: FC = () => {
  return (
    <main className={styles.main}>
        <BurgerIngredients />
        <BurgerConstructor />
    </main>
  );
}

export default Main;