import React from 'react';
import FeedItemDetails from '../components/feed-item-details/feed-item-details';
import styles from './page.module.css';

export function FeedItemDetailedPage() {
  return (
    <div className={`${styles.container} ${styles.containerDiff}`}>
      <FeedItemDetails />
    </div>
  );
}
