import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import FormResetPassword from '../components/form-reset-password/form-reset-password';
import { resetPassword } from '../services/actions/auth';
import styles from './page.module.css';

export function ResetPasswordPage() {
  const dispatch = useDispatch();

  const handleResetPassword = useCallback(
    (e, form) => {
      e.preventDefault();
      dispatch(resetPassword(form));
    },
    [resetPassword, dispatch]
  );

  return (
    <div className={styles.container}>
      <FormResetPassword onBtnClick={handleResetPassword} />
    </div>
  );
}
