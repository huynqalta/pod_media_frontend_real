import { DataRequest } from "@components/commons/TableComponent_New/interface";
import { ParamsAxiosCallAPI, ParamsAxiosTableCallAPI } from "@interface/index";
interface Session {
  name: string;
  title: string;
  description: string;
}


export const getQuestion = (dataBody:DataRequest,{groupCodeId}):ParamsAxiosTableCallAPI =>{
  const params = dataBody;
  return {
      endpoint:`/api/survey/question/get-all-question`,
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
export const createQuestion = (dataBody: Session): ParamsAxiosCallAPI => {
  return {
    endpoint: "/api/survey/create-question",
    method: "POST",
    body: dataBody,
  };
};
export const updateQuestion = (
  dataBody: Session,
  id: string
): ParamsAxiosCallAPI => {
  return {
    endpoint: `/api/survey/question/${id}`,
    method: "PUT",
    body: dataBody,
  };
};
export const deleteQuestion = (id): ParamsAxiosCallAPI => {
  return {
    endpoint: `/api/survey/question/${id}`,
    method: "DELETE",
  };
};
