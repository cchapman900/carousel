import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setEditMode, setViewMode, getMode } from "./editorSlice";
import styles from "./Editor.module.css";
import { ImageSelector } from "../carousel/ImageSelector";
import { Carousel } from "../carousel/Carousel";

export function Editor() {
  const mode = useSelector(getMode);
  const dispatch = useDispatch();

  /*******************************
   * RENDER METHODS
   *******************************/

  function renderEditorToolbar() {
    return mode === "view" ? (
      <button onClick={() => dispatch(setEditMode())}>Edit</button>
    ) : (
      <button onClick={() => dispatch(setViewMode())}>View</button>
    );
  }

  return (
    <div>
      {renderEditorToolbar()}
      {mode === "edit" && <ImageSelector />}
      <hr />
      <Carousel />
      <hr />
    </div>
  );
}
