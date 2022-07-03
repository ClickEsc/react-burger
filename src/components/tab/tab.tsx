import React, { FC } from 'react';
import styles from './tab.module.css';

export const Tab: FC<{ text: string, active: boolean }> = ({ text, active }) => {
  const className = `${styles.tab} text text_type_main-default ${active ? styles.active : ''}`;
  return (
    <section className={`${className}`}>
      {text}
    </section>
  );
};

export default Tab;
