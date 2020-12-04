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
    selectImage: (state, action) => {
      state.images = state.images.map((image) => {
        if (image.imageName === action.payload) {
          return {...image, isSelected: true}
        } else {
          return image
        }
      });
    },
    /**
     * Set a single image to selected
     */
    setSelectedImage: (state, action) => {
      state.images = state.images.map((image) => {
        if (image.imageName === action.payload) {
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
    deselectImage: (state, action = []) => {
      console.log('Deselect image', action.payload)
      const selectedImages = state.images.map((image) => {
        if (image.imageName === action.payload) {
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
    addSelectedImages: (state) => {
      state.images = state.images.map((image) => {
        if (image.isSelected) {
          return {...image, isActive: true, isSelected: false}
        } else {
          return image
        }
      })
    },
    /**
     * Remove images from carousel
     */
    removeSelectedImages: (state, action) => {
      console.log(action.payload)
      state.images = state.images.map((image) => {
        if (image.isSelected) {
          return {...image, isActive: false, isSelected: false}
        } else {
          return image
        }
        // if (action.payload.includes(image.imageName)) {
        //   return {...image, isActive: false}
        // } else {
        //   return image
        // }
      })
    },
    /**
     * Set the number of images at a time to show in the Carousel
     */
    setSize: (state, action) => {
      state.size = action.payload
    }
  },
});

export const { selectImage, setSelectedImage, deselectImage, addSelectedImages, removeSelectedImages, setSize } = carouselSlice.actions;

export const getActiveImages = (state) => {
  return state.carousel.images.filter((image) => {
    return image.isActive === true;
  }).sort((a, b) => {
    return a.imageCaption < b.imageCaption ? -1 : 1;
  });
}


export const getInactiveImages = state => state.carousel.images.filter((image) => {
  return image.isActive === false;
}).sort((a, b) => {
  return a.imageCaption < b.imageCaption ? -1 : 1;
});

export const getSelectedImage = state => {
  const selectedImages = state.carousel.images.filter((image) => {
    return image.isActive === true;
  });
  if (selectedImages.length > 1) {
    throw new Error('More than one selected image');
  }
  return selectedImages[0] || null;
}

export const getSize = state => {
  return state.carousel.size;
}

export default carouselSlice.reducer;
