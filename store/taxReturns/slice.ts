import { createSlice } from "@reduxjs/toolkit";
import { reducers } from "./reducer";
export interface taxReturnState {
  taxReturn: {
    rows: Array<any>;
    count: number;
  };
}

const initialState: taxReturnState = {
  taxReturn: {
    rows: [],
    count: 0,
  },
};

export const taxReturnSlice = createSlice({
  name: "taxReturn",
  initialState,
  reducers: reducers,
});

export const taxReturnActions = taxReturnSlice.actions;
