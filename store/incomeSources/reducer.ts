import { PayloadAction } from "@reduxjs/toolkit";

export const reducers = {
  setIncomeSource(state: any, actions: PayloadAction<any>) {
    state.incomeSource = actions.payload.incomeSource;
  },
};
