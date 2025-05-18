import { PayloadAction } from "@reduxjs/toolkit";

export const reducers = {
  setdocument(state: any, actions: PayloadAction<any>) {
    state.document = actions.payload.document;
  },
};
