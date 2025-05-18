import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { reducers } from "./reducer";

export interface ApplicationState {
  bearerToken: string;
  id: string;
  email: string;
  apiState: {
    isError: boolean;
    status: number;
    message: string;
  };
  isLoginError: boolean;
}

const getUserData = () => {
  try {
    return JSON.parse(localStorage.getItem("LOGGED_IN_USER") || "{}");
  } catch {
    return {};
  }
};

const userData = getUserData();

const initialState: ApplicationState = {
  bearerToken: Cookies.get("bearerToken") || "",
  id: userData?.id || "",
  email: userData?.email || "",
  apiState: {
    isError: false,
    status: 0,
    message: "",
  },
  isLoginError: false,
};

export const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers,
});

export const applicationActions = applicationSlice.actions;
