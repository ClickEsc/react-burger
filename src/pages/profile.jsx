import React from 'react';
import Profile from '../components/profile/profile';
import styles from './page.module.css';

export function ProfilePage() {
  return (
    <div className={`${styles.container} ${styles.containerDiff}`}>
      <Profile />
    </div>
  );
}
