import axios from "axios";
import { AppConfig } from "../../config/config";
import { userDetailsModel } from "../../models/user";
import { userActions } from "./slice";
import { setApiState } from "../applications/actions";

export const getUserDetails = (UserId: string, headers = {}) => {
  return async (dispatch: any) => {
    try {
      const { data, status } = await axios.get(
        `${AppConfig.BACKEND_URL}/admin/get-allUsers`,
        headers
      );
      
      dispatch(
        userActions.setUserDetails({
          userDetails: {
            details: userDetailsModel(data.profile),
          },
        })
      );

      if(status!==200){
        throw new Error(data);
      }

      dispatch(setApiState({ isError: false, status: 200, message: "" }));

    } catch (error: any) {
      console.log(error);
      dispatch(
        setApiState({
          isError: true,
          status: error?.response?.data?.status ?? 500,
          message: error?.response?.data?.message ?? "Something Went Wrong",
        })
      );
    }
  };
};

export const updateUserDetails = (Update: Boolean, payload: any, headers = {}) => {
  return async (dispatch: any) => {
    try {
      const url = Update
        ? `${AppConfig.BACKEND_URL}/admin/update-profile`
        : `${AppConfig.BACKEND_URL}/admin/create-profile`;

      const { data, status } = await axios.post(url, payload, headers);

      if(status!==200){
        throw new Error(data);
      }
      dispatch(setApiState({ isError: false, status: 200, message: "" }));
    } catch (error: any) {
      console.log(error);
      dispatch(
        setApiState({
          isError: true,
          status: error?.response?.data?.status ?? 500,
          message: error?.response?.data?.message ?? "Something Went Wrong",
        })
      );
    }
  };
};

