import React from 'react';
import FormSignup from '../components/form-signup/form-signup';
import styles from './page.module.css';

export function SignupPage() {
  return (
    <div className={styles.container}>
      <FormSignup />
    </div>
  );
}
