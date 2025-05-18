import { PayloadAction } from "@reduxjs/toolkit";

export const reducers = {
  setBankDetails(state: any, actions: PayloadAction<any>) {
    state.bankDetails = actions.payload.bankDetails;
  },
};
