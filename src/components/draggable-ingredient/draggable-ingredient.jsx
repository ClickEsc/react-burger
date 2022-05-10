import React from 'react';
import { useDrag } from 'react-dnd';
import styles from './draggable-ingredient.module.css';

function DraggableIngredient({ children, ingredientData }) {
  const [{ isDrag }, dragRef] = useDrag({
      type: "ingredient",
      item: { id: ingredientData._id },
      collect: monitor => ({
        isDrag: monitor.isDragging()
      })
  });

  return (
    <li ref={dragRef} className={isDrag ? styles.dragged : ''}>
      {children}
    </li>
  );
};

export default DraggableIngredient;