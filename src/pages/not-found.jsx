import React from 'react';
import NotFound404 from '../components/not-found-404/not-found-404';
import styles from './page.module.css';

export function NotFoundPage() {
  return (
    <div className={styles.container}>
      <NotFound404 />
    </div>
  );
}