import React from 'react';
import AppNav from '../app-nav/app-nav';
import styles from './app-header.module.css';

function AppHeader() {
  return (
    <header className={styles.header}>
      <AppNav />
    </header>
  );
}

export default AppHeader;
