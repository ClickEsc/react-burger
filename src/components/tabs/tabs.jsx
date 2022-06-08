
import React from 'react';
import PropTypes from 'prop-types';
import { shallowEqual, useSelector } from 'react-redux';
import { Tab } from '../tab/tab';
import styles from './tabs.module.css';

const Tabs = ({ bunTabRef, sauceTabRef, mainTabRef }) => {
  const { currentTab } = useSelector(store => store.app, shallowEqual);

  const onTabClick = (ref) => {
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
            tabType="bun"
            active={currentTab === 'bun'} />
        </li>
        <li onClick={() => onTabClick(sauceTabRef)} className={styles.listItem}>
          <Tab
            text="Соусы"
            tabType="sauce"
            active={currentTab === 'sauce'} />
          </li>
        <li onClick={() => onTabClick(mainTabRef)} className={styles.listItem}>
          <Tab
            text="Начинки"
            tabType="main"
            active={currentTab === 'main'} />
        </li>
      </ul>
    </div>
  )
}

Tabs.propTypes = {
  bunTabRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  sauceTabRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  mainTabRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) })
}

export default Tabs;