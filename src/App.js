import React from 'react';
import './App.css';
import { Carousel } from './features/carousel/Carousel';
import { ImageSelector } from './features/carousel/ImageSelector';

function App() {
  return (
    <div className="App">
      <ImageSelector />
      <hr/>
      <Carousel />
      <hr/>
    </div>
  );
}

export default App;
