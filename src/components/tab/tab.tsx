import React, { FC } from 'react';
import styles from './tab.module.css';
import { switchTab } from '../../services/actions';

export const Tab: FC<{ text: string, active: boolean }> = ({ text, active }) => {
  const className = `${styles.tab} text text_type_main-default ${active ? styles.active : ''}`;
  return (
    <section className={`${className}`} onClick={switchTab}>
      {text}
    </section>
  );
};

export default Tab;
