import { ReactNode } from "react";

export interface DataRequest {
  pageSize?: number;
  pageNumber?: number;
  searchContent?: string;
  orderByQuery?:string;
  dateFrom?: string;
  dateTo?: string;
  status?: number;
  active?: boolean;
  queryPagination?:string;
}
export const initDataRequest = {
  pageSize: 10,
  pageNumber: 1,
  searchContent: undefined,
  orderByQuery:"updatedAt desc",
  dateFrom: undefined,
  dateTo: undefined,
  status: undefined,
  active: undefined,
  queryPagination:undefined
};

export interface InfoResponse {
  pageSize?: number;
  currentPage: number;
  totalCount: number;
  hasNext?:boolean;
  hasPrevious?:boolean;
  totalPages?:number
}
export interface DataResponse {
    data: Array<any>;
    info: InfoResponse;
}
