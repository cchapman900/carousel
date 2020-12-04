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
  getSelectedImages,
} from "./carouselSlice";
import { getMode } from "../editor/editorSlice";
import styles from "./Carousel.module.css";

export function Carousel() {

  const availableCarouselSizes = [2, 3, 4, 5];

  const activeImages = useSelector(getActiveImages);
  const selectedImages = useSelector(getSelectedImages);
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
    dispatch(setSize(event.target.value))
  }

  /*******************************
   * RENDER METHODS
   *******************************/

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
    return <div className={styles.carouselContainer}>{carouselImages}</div>;
  }

  function renderCarouselImage({ imageName, imageCaption, isSelected }) {
    return (
      <figure
        key={imageName}
        className={styles.carouselSlot}
        onClick={() => handleToggleSelect(imageName, isSelected)}
      >
        <img
          src={`/images/${imageName}`}
          alt={imageCaption}
          height={500 / carouselSize}
          width={500 / carouselSize}
          className={isSelected ? styles.imageSelectContainerSelected : ""}
        />
        <figcaption>{imageCaption}</figcaption>
      </figure>
    );
  }

  function renderPaginationControls() {
    let paginationButtons = [];
    for (let i = 0; i < lastPage(); i++) {
      paginationButtons.push(
        <button
          key={`pagination-button-${i}`}
          style={i === page ? { color: "white" } : {}}
          onClick={() => setPage(i)}
        >
          &#8226;
        </button>
      );
    }
    return (
      <div>
        <button disabled={page === 0} onClick={() => setPage(page - 1)}>
          Prev
        </button>
        {paginationButtons}
        <button
          disabled={page >= lastPage() - 1}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    );
  }

  function renderEditorToolbar() {
    const options = availableCarouselSizes.map(size => {
      return(
        <option key={`option-${size}`} value={size}>
          {size}
        </option>
      )
    });
    return (
      <div>
        <div style={{float: 'left'}}>
          <label>Carousel size</label>
          <select onChange={handleSetCarouselSize} defaultValue={carouselSize}>
            {options}
          </select>
        </div>
        <div style={{float: 'right'}}>
          <button disabled={selectedImages.length === 0} onClick={handleRemoveImages}>Delete</button>
        </div>
      </div>
    );
  }

  if (activeImages.length === 0) {
    return <div>This carousel is empty</div>;
  } else {
    return (
      <div>
        {editorMode === "edit" && renderEditorToolbar()}
        {renderCarousel()}
        {renderPaginationControls()}
      </div>
    );
  }
}
