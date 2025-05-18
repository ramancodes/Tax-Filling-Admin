import { AppConfig } from "../../config/config";
import { documentModel } from "../../models/documents";
import { setApiState } from "../applications/actions";
import { documentActions } from "./slice";
import axios from "axios";

export const getDocument = (UserId: string, headers: any = {}) => {
  
  return async (dispatch: any) => {
    try {
      const {
        data: {
            documents: { rows, count },
        },
        status,
      } = await axios.get(
        `${AppConfig.BACKEND_URL}/get-documents/${UserId}`,
        headers
      );
      
      const documentObj =
        rows && rows.length > 0
          ? rows.map((documentObj: any) => documentModel(documentObj))
          : [];

      dispatch(
        documentActions.setdocument({
            document: { rows: documentObj, count: count },
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

export const updateDocument = (
  headers: any = {},
  payload: any = {}
) => {
  return async (dispatch: any) => {
    try {
      delete payload.UserId;
      delete payload.file;
      delete payload.fileName;
      const { data, status } = await axios.put(
        `${AppConfig.BACKEND_URL}/update-document`,
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

export const deleteDocument = (documentId: string, headers: any = {}) => {
  return async (dispatch: any) => {
    try {
      const { data, status } = await axios.delete(
        `${AppConfig.BACKEND_URL}/delete-document/${documentId}`,
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

export const addDocument = (UserId: string, headers: any = {}, payload: any = {}) => {
  return async (dispatch: any) => {
    payload['UserId'] = UserId;
    delete payload?.documentId;
    
    try {
      const { data, status } = await axios.post(
        `${AppConfig.BACKEND_URL}/add-document`,
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
