import React, { useState, useEffect } from 'react';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import PanelText from './panel-text/panel-text';
import { 
  API_URL_GET_INGREDIENTS,
  ERROR_FETCH_GET_INGREDIENTS,
  IS_LOADING_TEXT,
  HAS_ERROR_TEXT
} from '../../utils/constants';
import styles from './app.module.css';

function App() {
  const [state, setState] = useState({
    ingredientsData: [],
    isLoading: false,
    hasError: false
  });
  const { ingredientsData, isLoading, hasError } = state;
  const isDataValid = !isLoading && !hasError && ingredientsData.length;

  const getIngredientsData = async () => {
    setState({ ...state, isLoading: true });
    fetch(API_URL_GET_INGREDIENTS)
      .then(res => res.json())
      .then((res) => {
          setState({ ...state, ingredientsData: res.data, isLoading: false });
      })
      .catch((err) => {
        console.log(`${ERROR_FETCH_GET_INGREDIENTS}: ${err}`);
        setState({ ...state, hasError: true });
      })
  }

  useEffect(() => {
    getIngredientsData();
  }, [])

  return (
    <div className={styles.app}>
      <AppHeader />
      {isLoading && <PanelText text={IS_LOADING_TEXT} isError={hasError} />} 
      {hasError && <PanelText text={HAS_ERROR_TEXT} isError={hasError} />}
      {isDataValid ? <Main data={ingredientsData} /> : <></>}
    </div>
  );
}

export default App;
