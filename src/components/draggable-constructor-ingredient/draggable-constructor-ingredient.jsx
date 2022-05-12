import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useDrag, useDrop } from 'react-dnd';
import styles from './draggable-constructor-ingredient.module.css';
import { ingredientPropTypes } from '../../utils/types';

function DraggableConstructorIngredient({ index, dragRefType, children, ingredientData, moveIngredient }) {
  const ref = useRef();

  const [{ isDrag }, dragRef] = useDrag({
      type: dragRefType,
      item: ingredientData,
      collect: monitor => ({
        isDrag: monitor.isDragging()
      })
  });

  const [, dropRef] = useDrop({
    accept: dragRefType,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) return

      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset.y - hoverBoundingRect.top

      if (dragIndex < hoverIndex || hoverClientY < hoverMiddleY) return
      if (dragIndex > hoverIndex || hoverClientY > hoverMiddleY) return

      moveIngredient(dragIndex, hoverIndex)
      item.index = hoverIndex
    }
  })

  const dndRef = dragRef(dropRef(ref))

  return (
    <li
      ref={dndRef}
      className={isDrag ? styles.dragged : ''}
    >
      {children}
    </li>
  );
};

DraggableConstructorIngredient.propTypes = {
  index: PropTypes.number.isRequired,
  dragRefType: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  ingredientData: ingredientPropTypes.isRequired,
  moveIngredient: PropTypes.func.isRequired
};

export default DraggableConstructorIngredient;