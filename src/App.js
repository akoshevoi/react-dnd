import React from 'react';
import Container from './Container';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const INITIAL_STATE = { movieCategory: '' };
console.log('asd')
console.log('Hello')

class App extends React.Component {
  state = { ...INITIAL_STATE };

  setMovieCategory = movieCategory => {
    this.setState(movieCategory);
  }

  render() {
    return (
      <DndProvider backend={HTML5Backend}>
        <Container setMovieCategory={this.setMovieCategory}/>
      </DndProvider>
    )
  }
}

export default App;