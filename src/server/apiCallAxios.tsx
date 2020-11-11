import { BASE_URL } from "../config/path";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import NotificationComponent from "@components/commons/NotificationComponent";

interface IApiParam {
  initRes?: any;
  showSuccess?: boolean;
  showError?: boolean;
  useLoading?: boolean;
  useRes?: boolean;
  _useDispatch?: boolean;
}
interface Default<T> {
  execute: any;
  res: T;
  loading: boolean;
}

export function useApi<T>(option?: IApiParam): Default<T> {
  const defaultOption: IApiParam = {
    initRes: option?.initRes || null,
    showSuccess: option?.showSuccess || false,
    useLoading: option?.useLoading || false,
    useRes: option?.useRes || false,
    _useDispatch: option?._useDispatch || false,
  };

  const {
    initRes,
    showSuccess,
    useLoading,
    useRes,
    _useDispatch,
  } = defaultOption;
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState<T>(initRes);
  const dispatch = useDispatch();

  const checkSetLoading = (status) => {
    if (useLoading) {
      setLoading(status);
    }
  };

  const handleSuccess = (res, convertRes, action) => {
    if (useRes) {
      setRes(convertRes);
    }
    checkSetLoading(false);
    if (showSuccess) {
      NotificationComponent({
        type: "success",
        notificationProps: { message: res.message },
      });
    }
    if (action && _useDispatch) {
      dispatch(action(convertRes));
    }
  };

  const handleError = (err) => {
    checkSetLoading(false);
  };

  const execute = (params): Promise<any> => {
    checkSetLoading(true);
    const {
      endpoint = "",
      method = "GET",
      body = {},
      action,
      convertRes = (res) => res,
    } = params;

    let _body;

    if (body) {
      _body = [`${BASE_URL}${endpoint}`, body];
    } else {
      _body = [`${BASE_URL}${endpoint}`];
    }

    return axios[method.toLowerCase()](..._body)
      .then((res: any) => {
        handleSuccess(res, convertRes(res), action);
        return Promise.resolve(convertRes(res));
      })
      .catch((err) => {
        handleError(err);
        return Promise.reject(err);
      });
  };

  return {
    execute,
    res,
    loading,
  };
}
