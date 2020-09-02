import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import FavouriteMovie from './FavouriteMovie';
import CategoryMovie from './CategoryMovie';
import update from 'immutability-helper';

const styles = {
  display: 'flex',
  marginTop: 100,
}

const Container = () => {
  const [values, setValues] = useState({
    widthDragElement: 0,
    heightDragElement: 0,
    topDragElement: 0,
    leftDragElement: 0,
  })

    const [, drop] = useDrop({
    accept: ItemTypes.BOX,
    drop(item, monitor) {
      const delta = monitor.getDifferenceFromInitialOffset();
      if (delta !== null) {
        const left = Math.round(values.leftDragElement + delta.x);
        const top = Math.round(values.topDragElement + delta.y);
        moveBox(left, top);
      } 
    }
  })

  const moveBox = (left, top) => {
    setValues(
      update(values, {
        $merge: { left, top } 
      })
    )
  }
  
  return (
    <div ref={drop}>
      <FavouriteMovie 
        values={values}
        setValues={setValues}
        hideSourceOnDrag={true}
      />
      <div style={styles}>
        <CategoryMovie 
          values={values}
          setValues={setValues}
        />
        <CategoryMovie 
          values={values}
          setValues={setValues}
        />
        <CategoryMovie 
          values={values}
          setValues={setValues}
        />
      </div>
    </div>
  )
}

export default Container;

