import { createSlice } from "@reduxjs/toolkit";
import { reducers } from "./reducer";
export interface incomeSourceState {
  incomeSource: {
    rows: Array<any>;
    count: number;
  };
}

const initialState: incomeSourceState = {
  incomeSource: {
    rows: [],
    count: 0,
  },
};

export const incomeSourceSlice = createSlice({
  name: "incomeSource",
  initialState,
  reducers: reducers,
});

export const incomeSourceActions = incomeSourceSlice.actions;
