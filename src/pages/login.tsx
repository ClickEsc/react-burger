import React, { useCallback } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { shallowEqual } from 'react-redux';
import { useDispatch, useSelector } from '../services/hooks';
import { ILocation } from '../utils/types';
import FormLogin from '../components/form-login/form-login';
import { login } from '../services/actions/auth';
import styles from './page.module.css';

export function LoginPage() {
  const location = useLocation<ILocation>();
  const dispatch = useDispatch();
  const { user } = useSelector(store => store.auth, shallowEqual);
  const pathname = location?.state?.from?.pathname;

  const handleLogin = useCallback(
    (e, form) => {
      e.preventDefault();
      dispatch(login(form));
    },
    [login, dispatch]
  );

  if (user.isAuthorized) {
    return <Redirect to={pathname ? pathname : '/'} />
  }

  return (
    <div className={styles.container}>
      <FormLogin onSubmit={handleLogin} />
    </div>
  );
}
