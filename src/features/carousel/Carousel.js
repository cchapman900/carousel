import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectImage,
  deselectImage,
  removeSelectedImages,
  getActiveImages,
  getSize,
  setSelectedImage,
  setSize,
  getSelectedActiveImages,
} from "./carouselSlice";
import { getMode } from "../editor/editorSlice";
import styles from "./Carousel.module.css";
import { VIEW } from "../editor/exports";
import { CAROUSEL_WIDTH } from "./exports";

export function Carousel() {
  const availableCarouselSizes = [2, 3, 4, 5];

  const activeImages = useSelector(getActiveImages);
  const selectedImages = useSelector(getSelectedActiveImages);
  const carouselSize = useSelector(getSize);
  const editorMode = useSelector(getMode);
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);

  /*******************************
   * UTILITY METHODS
   *******************************/
  const lastPage = () => {
    return Math.ceil(activeImages.length / carouselSize);
  };

  /*******************************
   * HANDLER METHODS
   *******************************/

  function handleToggleSelectImage(imageName, isSelected) {
    if (editorMode === VIEW) {
      dispatch(setSelectedImage(imageName));
    } else {
      isSelected
        ? dispatch(deselectImage(imageName))
        : dispatch(selectImage(imageName));
    }
  }

  function handleRemoveImages() {
    dispatch(removeSelectedImages());
  }

  function handleSetCarouselSize(event) {
    dispatch(setSize(parseInt(event.target.value)));
  }

  /*******************************
   * RENDER METHODS
   *******************************/

  /**
   * All carousel images
   */
  function renderCarousel() {
    let carouselImages = [];
    for (
      let i = page * carouselSize;
      i < page * carouselSize + carouselSize;
      i++
    ) {
      const slot = activeImages[i];
      slot && carouselImages.push(renderCarouselImage(activeImages[i]));
    }
    return <div className={`${styles.carouselImageContainer} shadow`}>{carouselImages}</div>;
  }

  /**
   * And individual carousel item
   */
  function renderCarouselImage({ imageName, imageCaption, isSelected }) {
    const selectedImgClass = isSelected && styles.imageSelectContainerSelected;
    const imgClasses = `${styles.carouselImage} ${selectedImgClass} ${styles.carouselImageLeftClick}`;
    return (
      <div
        key={imageName}
        className={styles.carouselSlot}
        onClick={() => handleToggleSelectImage(imageName, isSelected)}
      >
        <img
          src={`/images/${imageName}`}
          alt={imageCaption}
          height={CAROUSEL_WIDTH / carouselSize}
          width={CAROUSEL_WIDTH / carouselSize}
          className={imgClasses}
        />
        <div className={styles.carouselCaption}>
          <div className={styles.carouselCaptionText}>{imageCaption}</div>
        </div>
      </div>
    );
  }

  function renderPaginationControls() {
    // Pagination circles
    let paginationButtons = [];
    for (let i = 0; i < lastPage(); i++) {
      paginationButtons.push(
        <button
          key={`pagination-button-${i}`}
          onClick={() => setPage(i)}
          className={`${styles.carouselPaginationButton} ${i === page && styles.carouselPaginationButtonActive}`}
        >
          &#8226;
        </button>
      );
    }
    return (
      <div>
        <button disabled={page === 0} onClick={() => setPage(page - 1)}>
          &#8249;
        </button>
        {paginationButtons}
        <button
          disabled={page >= lastPage() - 1}
          onClick={() => setPage(page + 1)}
        >
          &#8250;
        </button>
      </div>
    );
  }

  /**
   * Controls for editing the carousel
   */
  function renderEditorToolbar() {
    // Dropdown for carousel size
    const carouselSizeSelector = () => {
      return (
        <div>
          <label>Carousel size </label>
          <select
            className={`button button-gray`}
            onChange={handleSetCarouselSize}
            defaultValue={carouselSize}
          >
            {availableCarouselSizes.map((size) => {
              return (
                <option key={`option-${size}`} value={size}>
                  {size}
                </option>
              );
            })}
          </select>
        </div>
      );
    };
    // Button to remove an image from the carousel
    const deleteImageButton = () => {
      return (
        <button
          className="button button-red"
          disabled={selectedImages.length === 0}
          onClick={handleRemoveImages}
        >
          Delete
        </button>
      );
    };
    return (
      <div>
        <div style={{ float: "left" }}>{carouselSizeSelector()}</div>
        <div style={{ float: "right" }}>{deleteImageButton()}</div>
      </div>
    );
  }

  /**
   * Top-level element
   */
  if (activeImages.length === 0) {
    return (
      <div className={styles.carouselContainer}>
        This carousel is empty
      </div>
    );
  } else {
    return (
      <div className={styles.carouselContainer}>
        {editorMode === "edit" && renderEditorToolbar()}
        {renderCarousel()}
        {renderPaginationControls()}
      </div>
    );
  }
}
