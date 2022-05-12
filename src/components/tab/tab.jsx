import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import styles from './tab.module.css';
import { TAB_SWITCH } from '../../services/actions';

export const Tab = ({ text, tabType, active }) => {
  const dispatch = useDispatch();
  const switchTab = () => {
    dispatch({ type: TAB_SWITCH, tabType });
  };
  const className = `${styles.tab} text text_type_main-default ${active ? styles.active : ''}`;
  return (
    <div className={`${className}`} onClick={switchTab}>
      {text}
    </div>
  );
};

Tab.propTypes = {
  text: PropTypes.string.isRequired,
  tabType: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired
};