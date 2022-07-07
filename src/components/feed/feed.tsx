import React, { FC } from 'react';
import FeedList from '../feed-list/feed-list';
import styles from './feed.module.css';

const Feed: FC = () => {
  return (
    <section className={styles.section}>
      <FeedList />
      <div></div>
    </section>
  );
}

export default Feed;