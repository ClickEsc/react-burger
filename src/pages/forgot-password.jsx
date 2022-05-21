import React from 'react';
import FormForgotPassword from '../components/form-forgot-password/form-forgot-password';
import styles from './page.module.css';

export function ForgotPasswordPage() {

  return (
    <div className={styles.container}>
      <FormForgotPassword />
    </div>
  );
}
