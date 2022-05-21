import React from 'react';
import FormResetPassword from '../components/form-reset-password/form-reset-password';
import styles from './page.module.css';

export function ResetPasswordPage() {
  return (
    <div className={styles.container}>
      <FormResetPassword />
    </div>
  );
}
