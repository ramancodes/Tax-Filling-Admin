import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { usersSlice } from "./users/slice";
import { applicationSlice } from "./applications/slice";
import { bankSlice } from './bankDetails/slice'
import { incomeSourceSlice } from './incomeSources/slice'
import { documentSlice } from './documents/slice'
import { taxReturnSlice } from './taxReturns/slice'

export const store = configureStore({
  reducer: {
    [applicationSlice.name]: applicationSlice.reducer,
    [usersSlice.name]: usersSlice.reducer,
    [bankSlice.name]: bankSlice.reducer,
    [incomeSourceSlice.name]: incomeSourceSlice.reducer,
    [documentSlice.name]: documentSlice.reducer,
    [taxReturnSlice.name]: taxReturnSlice.reducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
