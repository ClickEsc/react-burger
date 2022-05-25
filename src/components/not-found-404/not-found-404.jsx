import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import NotFoundImg from '../../images/not-found.png';
import styles from './not-found-404.module.css';

export default function NotFound404() {
  return (
    <section className={styles.section}>
      <img src={NotFoundImg} alt="Иконка 404 ошибки" />
      <p className={`${styles.text} text text_type_main-medium text_color_inactive`}>Такой страницы не существует</p>
      <Link to="/">
        <Button type="secondary">
          Перейти на Главную
        </Button>
      </Link>
    </section>
  )
}