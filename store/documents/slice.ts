import { createSlice } from "@reduxjs/toolkit";
import { reducers } from "./reducer";
export interface documentState {
  document: {
    rows: Array<any>;
    count: number;
  };
}

const initialState: documentState = {
  document: {
    rows: [],
    count: 0,
  },
};

export const documentSlice = createSlice({
  name: "document",
  initialState,
  reducers: reducers,
});

export const documentActions = documentSlice.actions;
