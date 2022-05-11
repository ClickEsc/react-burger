import React from 'react';
import { useDrag } from 'react-dnd';
import styles from './draggable-ingredient.module.css';

function DraggableIngredient({ dragRefType, children, ingredientData }) {
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