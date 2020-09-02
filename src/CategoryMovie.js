import React, { useRef } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import update from 'immutability-helper';

const wrapperElementStyles = {
  width: 233,
  height: 119,
  marginRight: 20,
  backgroundColor: 'silver'
}

const dropElementStyles = {
  width: '100%',
  height: '100%'
}

const CategoryMovie = ({ values, setValues }) => {
  const wrapper = useRef();

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: ItemTypes.BOX,
    drop: (item, monitor) => {
      const widthDropElement = wrapper.current.getBoundingClientRect().width;
      const heightDropElement = wrapper.current.getBoundingClientRect().height;
      const topDropElement = wrapper.current.getBoundingClientRect().top;
      const leftDropElement = wrapper.current.getBoundingClientRect().left;

      const widthDragElement = values.widthDragElement;
      const heightDragElement = values.heightDragElement;

      const pointY = (heightDropElement - heightDragElement) / 2 + topDropElement;
      const pointX = (widthDropElement - widthDragElement) / 2 + leftDropElement;

      moveBox(pointY, pointX);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }), 
  })

  const toggleBoxShadow = (isActive, canDrop) => {
    if (isActive) {
      return '0 0 15px rgba(251, 255, 5, .8)'
    } else {
      return 'none'
    }
  }

  const isActive = canDrop && isOver
  const boxShadow = toggleBoxShadow(isActive, canDrop)

  const moveBox = (topDragElement, leftDragElement) => { 
    setValues(
      update(values, {
        $merge: { topDragElement, leftDragElement } 
      })
    )
  }

  return (
    <div ref={wrapper} style={{ ...wrapperElementStyles, boxShadow}}>
        <div ref={drop} style={dropElementStyles} />
    </div>

  )
}

export default CategoryMovie;