import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectImage,
  deselectImage,
  addSelectedImages,
  getInactiveImages,
  getSelectedInactiveImages,
} from "./carouselSlice";
import styles from "./Carousel.module.css";

export function ImageSelector() {
  const inactiveImages = useSelector(getInactiveImages);
  const selectedImages = useSelector(getSelectedInactiveImages);
  const dispatch = useDispatch();

  /*******************************
   * HANDLER METHODS
   *******************************/

  function handleToggleSelect(imageName, isSelected) {
    isSelected
      ? dispatch(deselectImage(imageName))
      : dispatch(selectImage(imageName));
  }

  function handleAddImages() {
    dispatch(addSelectedImages());
  }

  /*******************************
   * RENDER METHODS
   *******************************/

  function renderImageSelectSlot({ imageName, imageCaption, isSelected }) {
    const selectedImgClass = isSelected && styles.imageSelectContainerSelected;
    const imgClasses = `${styles.imageSelectImage} ${selectedImgClass}`;
    return (
      <figure
        key={imageName}
        className={styles.imageSelectContainer}
        onClick={() => handleToggleSelect(imageName, isSelected)}
      >
        <img
          src={`/images/${imageName}`}
          alt={imageCaption}
          height={100}
          width={100}
          className={imgClasses}
        />
        <figcaption>{imageCaption}</figcaption>
      </figure>
    );
  }

  function renderAddButton() {
    return (
      <button
        className="button button-green"
        disabled={selectedImages.length === 0}
        onClick={handleAddImages}
      >
        Add
      </button>
    );
  }

  return (
    <div className={styles.imageSelectorContainer}>
      <h2>Select images to add to the carousel</h2>
      <div className={styles.imageSelectionContainer}>
        {inactiveImages.map((image) => {
          return renderImageSelectSlot(image);
        })}
      </div>
      <br />
      <div>{renderAddButton()}</div>
    </div>
  );
}
