import React, { useCallback } from 'react';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import FormForgotPassword from '../components/form-forgot-password/form-forgot-password';
import { forgotPassword } from '../services/actions/auth';
import styles from './page.module.css';

export function ForgotPasswordPage() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { isResetPasswordEmailSent } = useSelector(store => store.auth, shallowEqual);
  const history = useHistory();

  const handleForgotPassword = useCallback(
    (e, form) => {
      e.preventDefault();
      dispatch(forgotPassword(form));
      history.push({
        pathname: '/reset-password',
        state: {
          from: location,
        },
      });
    },
    [forgotPassword, dispatch]
  );

  if (isResetPasswordEmailSent) {
    return (
      <Redirect
        to={{
          pathname: '/reset-password'
        }}
      />
    );
  }
  
  return (
    <div className={styles.container}>
      <FormForgotPassword onSubmit={handleForgotPassword} />
    </div>
  );
}
