import { createSlice } from "@reduxjs/toolkit";

import { carouselImages } from "../../data/carouselImages.json";

export const carouselSlice = createSlice({
  name: "carousel",
  initialState: {
    // Default: show 3 images in the carousel at a time
    size: 3,
    // Add isActive field to show if an images should be shown in the carousel,
    // and an isSelected field if it is selected in either of the modes
    images: carouselImages.map((carouselImage) => {
      return { ...carouselImage, isSelected: false, isActive: false };
    }),
  },
  reducers: {
    /**
     * Add image to selectedImages (multi-select) from an image name
     */
    selectImage: (state, action) => {
      state.images = state.images.map((image) => {
        if (image.imageName === action.payload) {
          return { ...image, isSelected: true };
        } else {
          return image;
        }
      });
    },
    /**
     * Set a single image to selected
     */
    setSelectedImage: (state, action) => {
      state.images = state.images.map((image) => {
        if (image.imageName === action.payload) {
          return { ...image, isSelected: true };
        } else {
          return { ...image, isSelected: false };
        }
      });
    },
    /**
     * Clear selected images from array of imageNames.
     */
    deselectImage: (state, action) => {
      const selectedImages = state.images.map((image) => {
        if (image.imageName === action.payload) {
          return { ...image, isSelected: false };
        } else {
          return image;
        }
      });
      state.images = selectedImages;
    },
    /**
     * Clear selected images
     */
    clearSelectedImages: (state, action = null) => {
      const selectedImages = state.images.map((image) => {
        return { ...image, isSelected: false };
      });
      state.images = selectedImages;
    },
    /**
     * Add images to carousel from available images, using imageName as the key
     */
    addSelectedImages: (state) => {
      state.images = state.images.map((image) => {
        if (image.isSelected) {
          return { ...image, isActive: true, isSelected: false };
        } else {
          return image;
        }
      });
    },
    /**
     * Remove images from carousel
     */
    removeSelectedImages: (state, action) => {
      state.images = state.images.map((image) => {
        if (image.isSelected) {
          return { ...image, isActive: false, isSelected: false };
        } else {
          return image;
        }
      });
    },
    /**
     * Set the number of images at a time to show in the Carousel
     */
    setSize: (state, action) => {
      state.size = action.payload;
    },
  },
});

export const {
  selectImage,
  addSelectedImages,
  setSelectedImage,
  deselectImage,
  clearSelectedImages,
  removeSelectedImages,
  setSize,
} = carouselSlice.actions;

export const getActiveImages = (state) => {
  return state.carousel.images
    .filter((image) => {
      return image.isActive === true;
    })
    .sort((a, b) => {
      return a.imageCaption < b.imageCaption ? -1 : 1;
    });
};

export const getInactiveImages = (state) =>
  state.carousel.images
    .filter((image) => {
      return image.isActive === false;
    })
    .sort((a, b) => {
      return a.imageCaption < b.imageCaption ? -1 : 1;
    });

export const getSelectedImages = (state) =>
  state.carousel.images
    .filter((image) => {
      return image.isSelected === true;
    })
    .sort((a, b) => {
      return a.imageCaption < b.imageCaption ? -1 : 1;
    });

export const getSelectedInactiveImages = (state) =>
  state.carousel.images
    .filter((image) => {
      return image.isSelected === true && image.isActive === false;
    })
    .sort((a, b) => {
      return a.imageCaption < b.imageCaption ? -1 : 1;
    });

export const getSelectedActiveImages = (state) =>
  state.carousel.images
    .filter((image) => {
      return image.isSelected === true && image.isActive === true;
    })
    .sort((a, b) => {
      return a.imageCaption < b.imageCaption ? -1 : 1;
    });

export const getSelectedImage = (state) => {
  const activeImages = state.carousel.images
    .filter((image) => {
      return image.isActive === true;
    })
    .sort((a, b) => {
      return a.imageCaption < b.imageCaption ? -1 : 1;
    });
  const selectedActiveImages = activeImages.filter((image) => {
    return image.isSelected === true;
  });
  // if (selectedImages.length > 1) {
  //   throw new Error('More than one selected image');
  // }
  if (selectedActiveImages.length > 0) {
    return selectedActiveImages[0];
  } else {
    return activeImages[0] || null;
  }
};

export const getSize = (state) => {
  return state.carousel.size;
};

export default carouselSlice.reducer;
