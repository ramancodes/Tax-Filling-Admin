import { AppConfig } from "../../config/config";
import { bankDetailsModel } from "../../models/bankDetails";
import { setApiState } from "../applications/actions";
import { bankActions } from "./slice";
import axios from "axios";

export const getBankDetails = (UserId: string, headers: any = {}) => {
  return async (dispatch: any) => {
    try {
      const {
        data: {
          bankDetails: { rows, count },
        },
        status,
      } = await axios.get(
        `${AppConfig.BACKEND_URL}/get-bankdetails/${UserId}`,
        headers
      );
      
      const bankDetailsObj =
        rows && rows.length > 0
          ? rows.map((bankDetailsObj: any) => bankDetailsModel(bankDetailsObj))
          : [];

      dispatch(
        bankActions.setBankDetails({
          bankDetails: { rows: bankDetailsObj, count: count },
        })
      );

      if (status !== 200) {
        throw new Error();
      }

      dispatch(setApiState({ isError: false, status: 200, message: "" }));
    } catch (error: any) {
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

export const updateBankDetails = (
  headers: any = {},
  payload: any = {}
) => {
  return async (dispatch: any) => {
    try {
      delete payload.UserId;
      const { data, status } = await axios.put(
        `${AppConfig.BACKEND_URL}/update-bankdetails`,
        payload,
        headers
      );

      if (status !== 200) {
        throw new Error(data);
      }
      dispatch(setApiState({ isError: false, status: 200, message: "" }));
    } catch (error: any) {
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

export const deleteBankDetails = (bankId: string, headers: any = {}) => {
  return async (dispatch: any) => {
    try {
      const { data, status } = await axios.delete(
        `${AppConfig.BACKEND_URL}/delete-bankdetails/${bankId}`,
        headers
      );

      if (status !== 200) {
        throw new Error(data);
      }
      dispatch(setApiState({ isError: false, status: 200, message: "" }));
    } catch (error: any) {
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

export const addBankDetails = (UserId: string, headers: any = {}, payload: any = {}) => {
  return async (dispatch: any) => {
    payload['UserId'] = UserId;
    delete payload.bankId;
    
    try {
      const { data, status } = await axios.post(
        `${AppConfig.BACKEND_URL}/add-bankdetails`,
        payload,
        headers
      );

      if (status !== 200) {
        throw new Error(data);
      }

      dispatch(setApiState({ isError: false, status: 200, message: "" }));
    } catch (error: any) {
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
