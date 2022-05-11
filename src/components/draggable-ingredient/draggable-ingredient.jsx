import React from 'react';
import { useDrag } from 'react-dnd';
import styles from './draggable-ingredient.module.css';

function DraggableIngredient({ dragRefType, children, ingredientData, handleDrag }) {
  const [{ isDrag }, dragRef] = useDrag({
      type: dragRefType,
      item: {
        id: ingredientData._id
      },
      collect: monitor => ({
        isDrag: monitor.isDragging()
      })
  });

  return (
    <li
      ref={dragRef}
      // handleDrag={handleDrag}
      className={isDrag ? styles.dragged : ''}
    >
      {children}
    </li>
  );
};

export default DraggableIngredient;