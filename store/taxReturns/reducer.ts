import { PayloadAction } from "@reduxjs/toolkit";

export const reducers = {
  settaxReturn(state: any, actions: PayloadAction<any>) {
    state.taxReturn = actions.payload.taxReturn;
  },
};
