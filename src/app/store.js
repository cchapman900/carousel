import { configureStore } from '@reduxjs/toolkit';
import carouselReducer from '../features/carousel/carouselSlice';

export default configureStore({
  reducer: {
    carousel: carouselReducer,
  },
});
