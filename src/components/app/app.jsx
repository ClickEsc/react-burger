import React from 'react';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import { data } from '../../utils/data';
import styles from './app.module.css';

function App() {
  return (
    <div className={styles.app}>
      <AppHeader />
      <Main data={data} />
    </div>
  );
}

export default App;
