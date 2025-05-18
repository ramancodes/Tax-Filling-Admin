import { AppConfig } from "../../config/config";
import { taxReturnModel } from "../../models/taxReturns";
import { setApiState } from "../applications/actions";
import { taxReturnActions } from "./slice";
import axios from "axios";

export const getTaxReturn = (UserId: string, headers: any = {}) => {
  return async (dispatch: any) => {
    try {
      const {
        data: {
          incomeTaxs: { rows, count },
        },
        status,
      } = await axios.get(
        `${AppConfig.BACKEND_URL}/get-incomeTaxs/${UserId}`,
        headers
      );

      const taxReturnObj =
        rows && rows.length > 0
          ? rows.map((taxReturnObj: any) => taxReturnModel(taxReturnObj))
          : [];

      dispatch(
        taxReturnActions.settaxReturn({
          taxReturn: { rows: taxReturnObj, count: count },
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

export const updateTaxReturn = (headers: any = {}, payload: any = {}) => {
  return async (dispatch: any) => {
    try {
      delete payload.UserId;
      const { data, status } = await axios.put(
        `${AppConfig.BACKEND_URL}/update-incomeTax`,
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

export const deleteTaxReturn = (incomeTaxId: string, headers: any = {}) => {
  return async (dispatch: any) => {
    try {
      const { data, status } = await axios.delete(
        `${AppConfig.BACKEND_URL}/delete-incomeTax/${incomeTaxId}`,
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

export const addTaxReturn = (
  UserId: string,
  headers: any = {},
  payload: any = {}
) => {
  return async (dispatch: any) => {
    payload["UserId"] = UserId;
    delete payload?.incomeTaxId;

    try {
      const { data, status } = await axios.post(
        `${AppConfig.BACKEND_URL}/add-incomeTax`,
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
