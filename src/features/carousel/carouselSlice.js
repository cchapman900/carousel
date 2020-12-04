import { createSlice } from '@reduxjs/toolkit';

import {carouselImages} from '../../data/carouselImages.json';

export const carouselSlice = createSlice({
  name: 'carousel',
  initialState: {
    size: 3,
    // Add isActive field to show if an images should be shown in the carousel,
    // and an isSelected field if it is selected in either of the modes
    images: carouselImages.map((carouselImage) => {
      return {...carouselImage, isSelected: false, isActive: false}
    })
  },
  reducers: {
    /**
     * Add image to selectedImages (multi-select) from an image name
     */
    selectImage: (state, {imageName}) => {
      state.images = state.images.map((image) => {
        if (image.key === imageName) {
          return {...image, isSelected: true}
        } else {
          return image
        }
      });
    },
    /**
     * Set a single image to selected
     */
    setSelectedImage: (state, {imageName}) => {
      state.images = state.images.map((image) => {
        if (image.key === imageName) {
          return {...image, isSelected: true}
        } else {
          return {...image, isSelected: false}
        }
      });
    },
    /**
     * Clear selected images from array of imageNames.
     * If imageNames array is not provided, clear all.
     */
    deselectImages: (state, {imageNames} = []) => {
      const selectedImages = state.images.map((image) => {
        if (imageNames.includes(image.name)) {
          return {...image, isSelected: false}
        } else {
          return image
        }
      })
      state.images = selectedImages;
    },
    /**
     * Add images to carousel from available images, using imageName as the key
     */
    addImages: (state, {imageNames}) => {
      state.images = state.images.map((image) => {
        if (imageNames.includes(image.imageName)) {
          return {...image, isActive: true}
        } else {
          return image
        }
      })
    },
    /**
     * Remove images from carousel
     */
    removeImages: (state, {imageNames}) => {
      state.images = state.images.map((image) => {
        if (imageNames.includes(image.imageName)) {
          return {...image, isActive: false}
        } else {
          return image
        }
      })
    },
    /**
     * Set the number of images at a time to show in the Carousel
     */
    setSize: (state, {size}) => {
      state.size = size
    }
  },
});

export const { selectImage, setSelectedImage, deselectImages, addImages, removeImages, setSize } = carouselSlice.actions;

export const selectActiveImages = (state) => {
  return state.carousel.images.filter((image) => {
    return image.isActive === true;
  }).sort((a, b) => {
    return a.imageCaption < b.imageCaption ? -1 : 1;
  });
}


export const selectInactiveImages = state => state.carousel.images.filter((image) => {
  return image.isActive === false;
}).sort((a, b) => {
  return a.imageCaption < b.imageCaption ? -1 : 1;
});

export const selectSelectedImage = state => {
  const selectedImages = state.carousel.images.filter((image) => {
    return image.isActive === true;
  });
  if (selectedImages.length > 1) {
    throw new Error('More than one selected image');
  }
  return selectedImages[0] || null;
}

export default carouselSlice.reducer;
