
import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { Tab } from '../tab/tab';
import styles from './tabs.module.css';

function Tabs() {
  const { currentTab } = useSelector(store => store.app, shallowEqual);
  return (
    <div className={styles.tabs}>
      <ul className={styles.list}>
        <li className={styles.listItem}><Tab text="Булки" tabType="bun" active={currentTab === 'bun'} /></li>
        <li className={styles.listItem}><Tab text="Соусы" tabType="sauce" active={currentTab === 'sauce'} /></li>
        <li className={styles.listItem}><Tab text="Начинки" tabType="main" active={currentTab === 'main'} /></li>
      </ul>
    </div>
  )
}

export default Tabs;