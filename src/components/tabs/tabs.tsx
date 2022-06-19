
import React, { FC } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { Tab } from '../tab/tab';
import styles from './tabs.module.css';

const Tabs: FC<{ bunTabRef: { current: HTMLHeadingElement | undefined}, sauceTabRef: { current: HTMLHeadingElement | undefined}, mainTabRef: { current: HTMLHeadingElement | undefined }}> = ({ bunTabRef, sauceTabRef, mainTabRef }) => {
  const { currentTab } = useSelector((store: { app: any }) => store.app, shallowEqual);

  const onTabClick: (ref: { current: HTMLHeadingElement | undefined }) => void = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className={styles.tabs}>
      <ul className={styles.list}>
        <li onClick={() => onTabClick(bunTabRef)} className={styles.listItem}>
          <Tab
            text="Булки"
            active={currentTab === 'bun'} />
        </li>
        <li onClick={() => onTabClick(sauceTabRef)} className={styles.listItem}>
          <Tab
            text="Соусы"
            active={currentTab === 'sauce'} />
          </li>
        <li onClick={() => onTabClick(mainTabRef)} className={styles.listItem}>
          <Tab
            text="Начинки"
            active={currentTab === 'main'} />
        </li>
      </ul>
    </div>
  )
}

export default Tabs;