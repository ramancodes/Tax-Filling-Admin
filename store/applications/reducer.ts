import { PayloadAction } from "@reduxjs/toolkit";
import { ApplicationState } from './slice'

export const reducers = {
  setApplicationState(
    state: ApplicationState,
    action: PayloadAction<any>
  ) {
    const { bearerToken, id, email } = action.payload;
    state.bearerToken = bearerToken;
    state.id = id;
    state.email = email;
  },

  setApiState(
    state: ApplicationState,
    action: PayloadAction<{ isError: boolean; status: number; message: string }>
  ) {
    state.apiState = action.payload;
  },

  setIsLoginError(state: ApplicationState, action: PayloadAction<{ isLoginError: boolean }>) {
    state.isLoginError = action.payload.isLoginError;
  }
};
