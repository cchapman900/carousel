import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectImage,
  deselectImages,
  addImages,
  selectInactiveImages,
} from './carouselSlice';
import styles from './Carousel.module.css';

export function ImageSelector() {
  const inactiveImages = useSelector(selectInactiveImages);
  const dispatch = useDispatch();

  function renderImageSelectSlot({imageName, imageCaption}) {
    return (
      <figure className={styles.imageSelectContainer}>
        <img src={`/images/${imageName}`} alt={imageCaption} height={100} width={100}/>
        <figcaption>
          {imageCaption}
        </figcaption>
      </figure>
    )
  }


  return (
    <div>
      <h2>Select images to add to the carousel</h2>
      {inactiveImages.map((image) => {
        return renderImageSelectSlot(image);
      })}
    </div>
  );
}
