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
    isSelected ? dispatch(deselectImage(imageName)) : dispatch(selectImage(imageName))
  }

  function handleAddImages() {
    dispatch(addSelectedImages())
  }

  /*******************************
   * RENDER METHODS
   *******************************/

  function renderImageSelectSlot({ imageName, imageCaption, isSelected }) {
    const selectedImgClass = isSelected && styles.imageSelectContainerSelected
    const imgClasses = `${styles.imageSelectImage} ${selectedImgClass}`
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
    return <button className='button button-green' disabled={selectedImages.length === 0} onClick={handleAddImages}>Add</button>
  }

  return (
    <div style={{backgroundColor: '#eee', padding: '8px 0', margin: '16px 0'}}>
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
