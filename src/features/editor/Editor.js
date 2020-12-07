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
import { EDIT, VIEW } from "./exports";
import "./Editor.css";

export function Editor() {
  const mode = useSelector(getMode);
  const activeImages = useSelector(getActiveImages);
  const dispatch = useDispatch();

  /*******************************
   * HANDLER METHODS
   *******************************/

  function handleToggleEditorMode(event) {
    if (mode === EDIT) {
      dispatch(clearSelectedImages());
      dispatch(setSelectedImage(activeImages[0]));
      dispatch(setViewMode());
    } else {
      dispatch(clearSelectedImages());
      dispatch(setEditMode());
    }
  }

  /*******************************
   * RENDER METHODS
   *******************************/

  function renderEditorToolbar() {
    return (
      <div className='editorToolbar'>
        <span style={{fontWeight: mode === EDIT ? 'bold' : 'normal'}}>Edit</span>
        <label className="switch">
          <input type="checkbox" onChange={handleToggleEditorMode} checked={mode === VIEW}/>
          <span className="slider round"></span>
        </label>
        <span style={{fontWeight: mode === VIEW ? 'bold' : 'normal'}}>View</span>
      </div>
    )
  }

  return (
    <div className='editorContainer'>
      <div className='editorModeButtonContainer'>
        {renderEditorToolbar()}
      </div>
      {mode === EDIT && <ImageSelector />}
      <Carousel />
      {mode === VIEW && <ImageViewer />}
    </div>
  );
}
