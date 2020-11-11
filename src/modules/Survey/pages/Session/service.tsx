import { DataRequest } from "@components/commons/TableComponent_New/interface";
import { ParamsAxiosCallAPI, ParamsAxiosTableCallAPI } from "@interface/index";
interface Session {
  name: string;
  title: string;
  description: string;
}

export const getSession = (dataBody:DataRequest,{groupCodeId}):ParamsAxiosTableCallAPI =>{
  const params = dataBody;
  return {
      endpoint:`/api/Session/Pagination`,
      method:"GET",
      body:{params},
      convertRes:(res)=>{
          return {
              data:res.data.pagedData,
              info:res.data.pageInfo
          }
      }
  }
}
export const createSession = (dataBody: Session): ParamsAxiosCallAPI => {
  return {
    endpoint: "/api/Session",
    method: "POST",
    body: dataBody,
  };
};
export const updateSession = (
  dataBody: Session,
  id: string
): ParamsAxiosCallAPI => {
  return {
    endpoint: `/api/Session/${id}`,
    method: "PUT",
    body: dataBody,
  };
};
export const deleteSession = (id): ParamsAxiosCallAPI => {
  return {
    endpoint: `/api/Session/${id}`,
    method: "DELETE",
  };
};

export const assignSession = (raw): ParamsAxiosCallAPI => {
  return {
    endpoint: `/api/ShareSession`,
    method: "POST",
    body: raw,
  };
};
