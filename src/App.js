import React from 'react';
import './App.css';
import { Carousel } from './features/carousel/Carousel';
import { ImageSelector } from './features/carousel/ImageSelector';
import { Editor } from './features/editor/Editor';

function App() {
  return (
    <div className="App">
      <Editor/>
    </div>
  );
}

export default App;
