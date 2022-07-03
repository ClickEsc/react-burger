import React, { FC } from 'react';
import styles from './panel-text.module.css';

const PanelText: FC<{ text?: string, isError?: boolean }> = ({ text, isError }) => {
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

export default PanelText;