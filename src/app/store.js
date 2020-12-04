import { configureStore } from '@reduxjs/toolkit';
import carouselReducer from '../features/carousel/carouselSlice';
import editorReducer from '../features/editor/editorSlice';

export default configureStore({
  reducer: {
    carousel: carouselReducer,
    editor: editorReducer,
  },
});
