import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectImage,
  deselectImage,
  addSelectedImages,
  getInactiveImages,
  getSelectedImages,
} from "./carouselSlice";
import styles from "./Carousel.module.css";

export function ImageSelector() {
  const inactiveImages = useSelector(getInactiveImages);
  const selectedImages = useSelector(getSelectedImages);
  const dispatch = useDispatch();

  /*******************************
   * HANDLER METHODS
   *******************************/

  function handleToggleSelect(imageName, isSelected) {
    isSelected ? dispatch(deselectImage(imageName)) : dispatch(selectImage(imageName))
  }

  function handleAddImages() {
    dispatch(addSelectedImages())
  }

  /*******************************
   * RENDER METHODS
   *******************************/

  function renderImageSelectSlot({ imageName, imageCaption, isSelected }) {
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
          className={isSelected ? styles.imageSelectContainerSelected : ''}
        />
        <figcaption>{imageCaption}</figcaption>
      </figure>
    );
  }

  function renderAddButton() {
    return <button disabled={selectedImages.length === 0} onClick={handleAddImages}>Add</button>
  }

  return (
    <div>
      <h2>Select images to add to the carousel</h2>
      <div className={styles.imageSelectorContainer}>
        {inactiveImages.map((image) => {
          return renderImageSelectSlot(image);
        })}
      </div>
      <br/>
      <div>
        {renderAddButton()}
      </div>
    </div>
  );
}
