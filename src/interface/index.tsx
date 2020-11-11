import { DataRequest, DataResponse, InfoResponse } from "@components/commons/TableComponent_New/interface";

export type methodApi = "GET" | "POST" | "DELETE" | "PUT";
export type DataStatus = "init" | "pending" | "success" | "modified";

export interface ParamsAxiosCallAPI {
  endpoint: string;
  method?: methodApi;
  action?: any;
  body?: any;
  convertRes?: (res) => void;
}
export interface ParamsAxiosTableCallAPI {
  endpoint: string;
  method?: methodApi;
  action?: any;
  body?: any;
  convertRes: (res) => DataResponse;
}
