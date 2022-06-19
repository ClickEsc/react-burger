import React, { FC, ReactNode } from 'react';
import { useDrag } from 'react-dnd';
import styles from './draggable-ingredient.module.css';
import { IIngredient } from '../../utils/types';

const DraggableIngredient: FC<{ dragRefType: string, children: ReactNode, ingredientData: IIngredient }> = ({ dragRefType, children, ingredientData }) =>  {
  const [{ isDrag }, dragRef] = useDrag({
      type: dragRefType,
      item: ingredientData,
      collect: monitor => ({
        isDrag: monitor.isDragging()
      })
  });

  return (
    <li
      ref={dragRef}
      className={isDrag ? styles.dragged : ''}
    >
      {children}
    </li>
  );
};

export default DraggableIngredient;