import React, { FC, ReactNode, FormEvent, FormEventHandler } from 'react';
import {
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './form.module.css';

const Form: FC<{ 
  formName: string,
  title?: string,
  inputs: ReactNode,
  submitBtnTitle: string,
  onSubmit: /*FormEventHandler<HTMLFormElement> |*/ ((e: FormEvent<HTMLFormElement>, form: HTMLFormElement) => void),
  hasCancel?: boolean,
  onCancel?: ((e: KeyboardEvent) => void) | (() => void),
  extra?: ReactNode
}> = ({formName,
  title,
  inputs,
  submitBtnTitle,
  onSubmit,
  hasCancel,
  onCancel,
  extra
}) => {
  return (
    <form
      className={styles.form}
      name={formName}
      onSubmit={onSubmit as FormEventHandler<HTMLFormElement>}
    >
      <div className={styles.wrapper}>
        {title && <h2 className={`${styles.title} text text_type_main-medium`}>{title}</h2>}
        {inputs}
        <div className={styles.buttons}>
          {hasCancel && <Button
            type="secondary"
            size="medium"
            onClick={onCancel as () => void}
          >
            Отмена
          </Button>}
          <Button
            // disabled={}
            type="primary"
            size="large"
            onClick={onSubmit as () => void}
          >
            {submitBtnTitle}
          </Button>
        </div>
        <div className={styles.extra}>
          {extra}
        </div>
      </div>
    </form>
  )
}

export default Form;