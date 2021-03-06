import React, { useCallback } from 'react';
import { useDispatch } from '../services/hooks';
import FormSignup from '../components/form-signup/form-signup';
import { signup } from '../services/actions/auth';
import styles from './page.module.css';

export function SignupPage() {
  const dispatch = useDispatch();
  
  const handleSignup = useCallback(
    (e, form) => {
      e.preventDefault();
      dispatch(signup(form));
    },
    [signup, dispatch]
  );
  
  return (
    <div className={styles.container}>
      <FormSignup onSubmit={handleSignup} />
    </div>
  );
}
