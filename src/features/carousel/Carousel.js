import React, { Fragment, useEffect, useState } from "react";
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
   * LIFECYCLE METHODS
   *******************************/
  useEffect(() => {

  }, [useSelector(getSize)])

  /*******************************
   * HANDLER METHODS
   *******************************/

  function handleToggleSelect(imageName, isSelected) {
    if (editorMode === "view") {
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
      console.log(page, i, carouselSize)
      const slot = activeImages[i];
      slot && carouselImages.push(renderCarouselImage(activeImages[i]));
    }
    return <div className={styles.carouselContainer}>{carouselImages}</div>;
  }

  /**
   * And individual carousel item
   */
  function renderCarouselImage({ imageName, imageCaption, isSelected }) {
    const selectedImgClass = isSelected && styles.imageSelectContainerSelected;
    const imgClasses = `${styles.carouselImage} ${selectedImgClass}`
    return (
      <div
        key={imageName}
        className={styles.carouselSlot}
        onClick={() => handleToggleSelect(imageName, isSelected)}
      >
        <img
          src={`/images/${imageName}`}
          alt={imageCaption}
          height={500 / carouselSize}
          width={500 / carouselSize}
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
          style={i === page ? { color: "blue", fontSize: '2rem', verticalAlign: 'middle' } : {}}
          onClick={() => setPage(i)}
          className={styles.carouselPaginationButton}
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
        <div style={{paddingBottom: '8px'}}>
          <label>Carousel size </label>
          <select className='button button-gray' onChange={handleSetCarouselSize} defaultValue={carouselSize}>
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
          className='button button-red'
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
    return <div>This carousel is empty</div>;
  } else {
    return (
      <div style={{padding: '16px 0'}}>
        {editorMode === "edit" && renderEditorToolbar()}
        {renderCarousel()}
        {renderPaginationControls()}
      </div>
    );
  }
}
