import { createSlice } from "@reduxjs/toolkit";
import { reducers } from "./reducer";
export interface usersState {
  users: {
    rows: Array<any>;
    count: number;
  };
}

const initialState: usersState = {
  users: {
    rows: [],
    count: 0,
  },
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: reducers,
});

export const userActions = usersSlice.actions;
