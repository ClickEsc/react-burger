import React, { FC } from 'react';
import FeedList from '../feed-list/feed-list';
import FeedStatistics from '../feed-statistics/feed-statistics';
import styles from './feed.module.css';

const Feed: FC = () => {
  return (
    <section className={styles.section}>
      <FeedList />
      <FeedStatistics />
    </section>
  );
}

export default Feed;