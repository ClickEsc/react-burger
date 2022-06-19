import React, { FC, Ref, useRef, useMemo } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { switchTab } from '../../services/actions';
import BurgerIngredientsSet from '../burger-ingredients-set/burger-ingredient-set';
import Tabs from '../tabs/tabs';
import styles from './burger-ingredients.module.css';

interface ItabValuesObj {
  [tabValue: string]: string;
}

const BurgerIngredients: FC = () => {
  const dispatch = useDispatch<any>();
  const { ingredientsList } = useSelector((store: { app: any }) => store.app, shallowEqual);
  const bunTabRef = useRef<HTMLHeadingElement>();
  const sauceTabRef = useRef<HTMLHeadingElement>();
  const mainTabRef = useRef<HTMLHeadingElement>();

  const content = useMemo<JSX.Element | undefined>(
    () => {
      if (ingredientsList.length) {
        const handleScroll = (e: React.BaseSyntheticEvent<UIEvent, EventTarget & HTMLElement>): void => {
          const currentTabItems = [...e.target.querySelectorAll('h3')].filter(item => item.getBoundingClientRect().top <= e.target.getBoundingClientRect().top);
          const currentTabType: string = currentTabItems[currentTabItems.length - 1].innerText;
      
          const tabValuesObj: ItabValuesObj = {
            "Булки": "bun",
            "Соусы": "sauce",
            "Начинки": "main"
          }
      
          dispatch(switchTab(tabValuesObj[currentTabType]))
        }
      
        return ( 
          <div className={styles.sets} onScroll={handleScroll}>
            <BurgerIngredientsSet ref={bunTabRef as Ref<HTMLHeadingElement> | undefined} title="Булки" type="bun" />
            <BurgerIngredientsSet ref={sauceTabRef as Ref<HTMLHeadingElement> | undefined} title="Соусы" type="sauce" />
            <BurgerIngredientsSet ref={mainTabRef as Ref<HTMLHeadingElement> | undefined} title="Начинки" type="main" />
          </div>
        );
      }
    },
    [ingredientsList, dispatch]
  );

  return (
    <section className={styles.section}>
      <div>
        <h3 className={`text text_type_main-large ${styles.title}`}>Соберите бургер</h3>
        <Tabs bunTabRef={bunTabRef} sauceTabRef={sauceTabRef} mainTabRef={mainTabRef} />
        {content}
      </div>
    </section>
  );
}

export default BurgerIngredients;
