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
      <button onClick={handleSetEditMode}>Edit</button>
    ) : (
      <button onClick={handleSetViewMode}>View</button>
    );
  }

  return (
    <div>
      {renderEditorToolbar()}
      {mode === "edit" && <ImageSelector />}
      <hr />
      <Carousel />
      <hr />
      {mode === "view" && <ImageViewer />}
    </div>
  );
}
