import React, { useRef } from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './ItemTypes';

const wrapperElementStyles = {
  width: 138,
  height: 63,
  backgroundColor: 'orange',
  position: 'absolute',
};

const dragElementStyles = {
  width: '100%',
  height: '100%',
};

const FavouriteMovie = ({ values, setValues, hideSourceOnDrag }) => {
  const wrapper = useRef();

  const top = values.topDragElement;
  const left = values.leftDragElement;

  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.BOX },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    begin: () => {
      const widthDragElement = wrapper.current.getBoundingClientRect().width;
      const heightDragElement = wrapper.current.getBoundingClientRect().height;
      const topDragElement = wrapper.current.getBoundingClientRect().top;
      const leftDragElement = wrapper.current.getBoundingClientRect().left;

      setValues({
        widthDragElement,
        heightDragElement,
        topDragElement,
        leftDragElement,
      });
    },
  });

  if (isDragging && hideSourceOnDrag) {
    return <div ref={drag} style={dragElementStyles} />;
  }

  return (
    <div ref={wrapper} style={{ ...wrapperElementStyles, top, left }}>
      <div ref={drag} style={dragElementStyles} />
    </div>
  );
};

export default FavouriteMovie;
