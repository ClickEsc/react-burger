import React, { FC } from 'react';
import AppNav from '../app-nav/app-nav';
import styles from './app-header.module.css';

const AppHeader: FC = () => {
  return (
    <header className={styles.header}>
      <AppNav />
    </header>
  );
}

export default AppHeader;
