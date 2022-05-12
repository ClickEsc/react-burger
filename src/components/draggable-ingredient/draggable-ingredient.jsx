import React from 'react';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import styles from './draggable-ingredient.module.css';
import { ingredientPropTypes } from '../../utils/types';

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

DraggableIngredient.propTypes = {
  dragRefType: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  ingredientData: ingredientPropTypes.isRequired
};

export default DraggableIngredient;