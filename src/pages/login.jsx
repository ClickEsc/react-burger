import React, { useCallback } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import FormLogin from '../components/form-login/form-login';
import { login } from '../services/actions/auth';
import styles from './page.module.css';

export function LoginPage() {
  const dispatch = useDispatch();
  const { user } = useSelector(store => store.auth, shallowEqual);

  const handleLogin = useCallback(
    (e, form) => {
      e.preventDefault();
      dispatch(login(form));
    },
    [login, dispatch]
  );

  if (user.isAuthorized) {
    return (
      <Redirect
        to={{
          pathname: '/'
        }}
      />
    );
  }

  return (
    <div className={styles.container}>
      <FormLogin onSubmit={handleLogin} />
    </div>
  );
}
