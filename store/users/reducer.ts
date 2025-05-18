import { PayloadAction } from "@reduxjs/toolkit";

export const reducers = {
  setUserDetails(state: any, actions: PayloadAction<any>) {
    state.userDetails = actions.payload.userDetails;
  },
};
