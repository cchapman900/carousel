import { createSlice } from '@reduxjs/toolkit';
import { EDIT, VIEW } from './exports';

export const editorSlice = createSlice({
  name: 'editor',
  initialState: {
    mode: EDIT,
  },
  reducers: {
    setViewMode: state => {
      state.mode = VIEW;
    },
    setEditMode: state => {
      state.mode = EDIT;
    },
  },
});

export const { setViewMode, setEditMode } = editorSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.editor.value)`
export const getMode = state => state.editor.mode;

export default editorSlice.reducer;
