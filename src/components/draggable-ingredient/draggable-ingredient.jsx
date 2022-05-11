import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import styles from './draggable-ingredient.module.css';

function DraggableIngredient({ item, dragRefType, children, ingredientData }) {
  const dispatch = useDispatch();
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
      // handleDrag={handleDrag}
      className={isDrag ? styles.dragged : ''}
    >
      {children}
    </li>
  );
};

export default DraggableIngredient;