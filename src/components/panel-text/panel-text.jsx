import React from 'react';
import PropTypes from 'prop-types';
import styles from './panel-text.module.css';

function PanelText({ text, isError }) {
  return (
    <>
      {text ?
        <div className={styles.panel}>
          <p className={`text text_type_main-default ${styles.text} ${isError && styles.isError}`}>{text}</p>
        </div>
      : null}
    </>
  );
}

PanelText.propTypes = {
  text: PropTypes.string.isRequired,
  isError: PropTypes.bool.isRequired,
};

export default PanelText;