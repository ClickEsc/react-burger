import React from 'react';
import FormLogin from '../components/form-login/form-login';
import styles from './page.module.css';

export function LoginPage() {

  return (
    <div className={styles.container}>
      <FormLogin />
    </div>
  );
}
