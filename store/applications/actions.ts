import { AppConfig } from "../../config/config";
import { applicationActions } from "./slice";
import Cookies from "js-cookie";
import axios from "axios";
import { AppDispatch } from "../index";

export const login = (userObj: any, login: boolean = true) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(applicationActions.setIsLoginError({isLoginError: false}));

      const url = login
        ? `${AppConfig.BACKEND_URL}/login`
        : `${AppConfig.BACKEND_URL}/register`;

      const { data } = await axios.post(url, userObj );

      dispatch(
        applicationActions.setApplicationState({
          bearerToken: data.token ?? "",
          id: data.user.id ?? "",
          email: data.user.email ?? "",
        })
      );

      localStorage.setItem("LOGGED_IN_USER", JSON.stringify(data.user));
      Cookies.set("bearerToken", data.token, { expires: 0.5 });
      dispatch(setApiState({ isError: false, status: 200, message: data.message }));
    } catch (error: any) {      
      dispatch(
        setApiState({
          isError: true,
          status: error?.response?.status ?? 500,
          message: error?.response?.data?.message || "Login failed",
        })
      );

      dispatch(applicationActions.setIsLoginError({isLoginError: true}));
    }
  };
};

export const logout = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(
        applicationActions.setApplicationState({
          bearerToken: "",
          id: "",
          email: "",
        })
      );
      localStorage.removeItem("LOGGED_IN_USER");
      Cookies.remove("bearerToken");
      dispatch(applicationActions.setApiState({isError: false, status: 200, message: "Logged out successfully"}));
    } catch (error: any) {
      dispatch(
        setApiState({
          isError: true,
          status: error?.response?.status ?? 500,
          message: error?.response?.data?.message ?? "Something Went Wrong",
        })
      );
    }
  };
};

export const setApiState = (apiStateObj: {
  isError: boolean;
  status: number;
  message: string;
}) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(applicationActions.setApiState(apiStateObj));
    } catch (error) {
      console.log(error);
    }
  };
};
