import { createSlice } from "@reduxjs/toolkit";
import { reducers } from "./reducer";
export interface bankState {
  bankDetails: {
    rows: Array<any>;
    count: number;
  };
}

const initialState: bankState = {
  bankDetails: {
    rows: [],
    count: 0,
  },
};

export const bankSlice = createSlice({
  name: "bankDetails",
  initialState,
  reducers: reducers,
});

export const bankActions = bankSlice.actions;
