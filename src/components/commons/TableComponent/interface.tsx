import { ReactNode } from "react";

export interface DataRequest {
  limit: number;
  page: number;
  search?: string;
  dateFrom?: string;
  dateTo?: string;
  status?: number;
  active?: boolean;
}
export const initDataRequest = {
  limit: 10,
  page: -1,
  search: "",
  dateFrom: undefined,
  dateTo: undefined,
  status: undefined,
  active: undefined,
};

export interface InfoResponse {
  limit: number;
  page: number;
  totalRecord: number;
}
export interface DataResponse {
  data: {
    data: Array<any>;
    info: InfoResponse;
  };
}
export interface DataResponseProps {
  data: Array<any>;
  info: Array<any>;
}
export type TypeFilter = "RangeDate" | "Select" | "Input" | "Checked";
export const typeFilter = {
  RangeDate: "RangeDate",
  Select: "Select",
  Input: "Input",
  Checked: "Checked",
};
export interface FilterObj {
  name?: string;
  children?: ReactNode;
  type?: TypeFilter;
  width?: string | number;
}
