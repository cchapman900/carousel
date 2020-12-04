import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectImage,
  deselectImage,
  removeSelectedImages,
  getActiveImages,
  getSize,
  setSelectedImage
} from "./carouselSlice";
import {
  setEditMode,
  setViewMode,
  getMode
} from "../editor/editorSlice";
import styles from "./Carousel.module.css";

export function Carousel() {
  const activeImages = useSelector(getActiveImages);
  const carouselSize = useSelector(getSize);
  const editorMode = useSelector(getMode);
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);

  /*******************************
   * UTILITY METHODS
   *******************************/
  const lastPage = () => {
    return Math.ceil(activeImages.length / carouselSize);
  }

  /*******************************
   * HANDLER METHODS
   *******************************/

  function handleToggleSelect(imageName, isSelected) {
    if (editorMode === 'view') {
      dispatch(setSelectedImage(imageName));
    } else {
      isSelected ? dispatch(deselectImage(imageName)) : dispatch(selectImage(imageName))
    }
  }

  function handleRemoveImages() {
    dispatch(removeSelectedImages())
  }

  /*******************************
   * RENDER METHODS
   *******************************/

  function renderCarousel() {
    let carouselImages = [];
    for (let i = page * carouselSize; i < page * carouselSize + carouselSize; i++) {
      const slot = activeImages[i];
      slot && carouselImages.push(renderCarouselImage(activeImages[i]))
    }
    return (
      <div className={styles.carouselContainer}>
        {carouselImages}
      </div>
    )
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
          height={500/carouselSize}
          width={500/carouselSize}
          className={isSelected ? styles.imageSelectContainerSelected : ''}
        />
        <figcaption>{imageCaption}</figcaption>
      </figure>
    );
  }

  function renderPaginationControls() {
    let paginationButtons = [];
    for (let i = 0; i < lastPage(); i++) {
      paginationButtons.push(
        <button style={i === page ? {color: 'white'} : {}} onClick={() => setPage(i)}>&#8226;</button>
      )
    }
    return (
      <div>
        <button disabled={page === 0} onClick={() => setPage(page - 1)}>Prev</button>
        {paginationButtons}
        <button disabled={page >= lastPage() - 1} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    )
  }

  function renderEditorToolbar() {
    return (
      <div>
        <button onClick={handleRemoveImages}>Remove</button>
      </div>
    )
  }

  if (activeImages.length === 0) {
    return <div>This carousel is empty</div>
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
