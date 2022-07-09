import React, { useCallback } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { shallowEqual } from 'react-redux';
import { useDispatch, useSelector } from '../services/hooks';
import { ILocation } from '../utils/types';
import FormResetPassword from '../components/form-reset-password/form-reset-password';
import { resetPassword } from '../services/actions/auth';
import styles from './page.module.css';

export function ResetPasswordPage() {
  const location = useLocation<ILocation>();
  const dispatch = useDispatch();
  const { isAuthorized } = useSelector(store => store.auth.user, shallowEqual);
  const pathname = location?.state?.from?.pathname;

  const handleResetPassword = useCallback(
    (e, form) => {
      e.preventDefault();
      dispatch(resetPassword(form));
    },
    [resetPassword, dispatch]
  );

  if (isAuthorized || pathname !== '/forgot-password') {
    return <Redirect to={pathname || '/'} />
  }

  return (
    <div className={styles.container}>
      <FormResetPassword onSubmit={handleResetPassword} />
    </div>
  );
}
