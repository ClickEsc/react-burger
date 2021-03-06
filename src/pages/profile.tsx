import React, { useEffect, useCallback } from 'react';
import { useDispatch } from '../services/hooks';
import Profile from '../components/profile/profile';
import { getProfile } from '../services/actions/auth';
import styles from './page.module.css';

export function ProfilePage() {
  const dispatch = useDispatch();

  const handleProfileInfo = useCallback(
    () => {
      dispatch(getProfile());
    },
    [getProfile, dispatch]
  );

  useEffect(() => {
    handleProfileInfo();
  }, [])

  return (
    <div className={`${styles.container} ${styles.containerDiff}`}>
      <Profile />
    </div>
  );
}
