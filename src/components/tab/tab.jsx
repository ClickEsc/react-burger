import React from 'react';
import PropTypes from 'prop-types';
import styles from './tab.module.css';
import { switchTab } from '../../services/actions';

export const Tab = ({ text, active }) => {
  const className = `${styles.tab} text text_type_main-default ${active ? styles.active : ''}`;
  return (
    <section className={`${className}`} onClick={switchTab}>
      {text}
    </section>
  );
};

Tab.propTypes = {
  text: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired
};