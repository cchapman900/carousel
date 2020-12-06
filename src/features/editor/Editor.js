import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearSelectedImages,
  setSelectedImage,
  getActiveImages,
} from "../carousel/carouselSlice";
import { setEditMode, setViewMode, getMode } from "./editorSlice";
import { ImageSelector } from "../carousel/ImageSelector";
import { ImageViewer } from "../carousel/ImageViewer";
import { Carousel } from "../carousel/Carousel";

export function Editor() {
  const mode = useSelector(getMode);
  const activeImages = useSelector(getActiveImages);
  const dispatch = useDispatch();

  /*******************************
   * HANDLER METHODS
   *******************************/
  function handleSetEditMode() {
    dispatch(clearSelectedImages());
    dispatch(setEditMode());
  }
  function handleSetViewMode() {
    dispatch(clearSelectedImages());
    dispatch(setSelectedImage(activeImages[0]));
    dispatch(setViewMode());
  }

  /*******************************
   * RENDER METHODS
   *******************************/

  function renderEditorToolbar() {
    return mode === "view" ? (
      <button onClick={handleSetEditMode} className={'button'}>Edit</button>
    ) : (
      <button onClick={handleSetViewMode} className={'button'}>View</button>
    );
  }

  return (
    <div style={{margin: '16px 0'}}>
      <div style={{textAlign: 'right'}}>
        {renderEditorToolbar()}
      </div>
      {mode === "edit" && <ImageSelector />}
      <Carousel />
      {mode === "view" && <ImageViewer />}
    </div>
  );
}
