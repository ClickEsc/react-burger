import React, { FC, ReactNode, useRef, LegacyRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import styles from './draggable-constructor-ingredient.module.css';
import { IIngredient } from '../../utils/types';

const DraggableConstructorIngredient: FC<{
  index: number,
  dragRefType: string,
  children: ReactNode,
  ingredientData: IIngredient,
  moveIngredient: (dragIndex: number, hoverIndex: number) => void
}> = ({
  index,
  dragRefType,
  children,
  ingredientData,
  moveIngredient
}) => {
  const ref = useRef<LegacyRef<HTMLLIElement> | undefined>();

  const [{ isDrag }, dragRef] = useDrag({
    type: dragRefType,
    item: ingredientData,
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  });

  const [, dropRef] = useDrop({
    accept: dragRefType,
    hover(item: IIngredient, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) return

      moveIngredient(dragIndex, hoverIndex)

      item.index = hoverIndex
    }
  })

  const dndRef = dragRef(dropRef(ref))

  return (
    <li
      ref={dndRef as React.LegacyRef<HTMLLIElement> | undefined}
      draggable
      className={isDrag ? styles.dragged : ''}
    >
      {children}
    </li>
  );
};

export default DraggableConstructorIngredient;