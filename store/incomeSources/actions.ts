import { AppConfig } from "../../config/config";
import { incomeSourcesModel } from "../../models/incomeSources";
import { setApiState } from "../applications/actions";
import { incomeSourceActions } from "./slice";
import axios from "axios";

export const getIncomeSource = (UserId: string, headers: any = {}) => {
  return async (dispatch: any) => {
    try {
      const {
        data: {
            incomeSources: { rows, count },
        },
        status,
      } = await axios.get(
        `${AppConfig.BACKEND_URL}/get-incomeSource/${UserId}`,
        headers
      );
      
      const incomeSourceObj =
        rows && rows.length > 0
          ? rows.map((incomeSourceObj: any) => incomeSourcesModel(incomeSourceObj))
          : [];

      dispatch(
        incomeSourceActions.setIncomeSource({
            incomeSource: { rows: incomeSourceObj, count: count },
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

export const updateIncomeSource = (
  headers: any = {},
  payload: any = {}
) => {
  return async (dispatch: any) => {
    try {
      delete payload.UserId;
      const { data, status } = await axios.put(
        `${AppConfig.BACKEND_URL}/update-incomeSource`,
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

export const deleteIncomeSource = (incomeSourceId: string, headers: any = {}) => {
  return async (dispatch: any) => {
    try {
      const { data, status } = await axios.delete(
        `${AppConfig.BACKEND_URL}/delete-incomeSource/${incomeSourceId}`,
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

export const addIncomeSource = (UserId: string, headers: any = {}, payload: any = {}) => {
  return async (dispatch: any) => {
    payload['UserId'] = UserId;
    delete payload.incomeSourceId;
    
    try {
      const { data, status } = await axios.post(
        `${AppConfig.BACKEND_URL}/add-incomeSource`,
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
