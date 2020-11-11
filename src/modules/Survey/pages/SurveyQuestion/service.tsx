import { ParamsAxiosCallAPI } from "@interface/index";
interface Session {
  insertMulti: Array<{
    sessionId: string;
    questionId: string;
    numberSelected: number;
  }>;
}
export const getDetailSession = (id): ParamsAxiosCallAPI => {
  return {
    endpoint: `/api/Session/${id}`,
    method: "GET",
  };
};
export const getAllQuestion = (body): ParamsAxiosCallAPI => {
  return {
    endpoint: `/api/survey/question/get-all-question`,
    method: "POST",
    body: body,
  };
};
export const getQuestionSession = (id): ParamsAxiosCallAPI => {
  return {
    endpoint: `/api/survey/sessionId/${id}`,
    method: "GET",
  };
};
export const getSessionQuestion = (pagination, { id }): ParamsAxiosCallAPI => {
  return {
    endpoint: `/api/survey/sessionId/${id}`,
    method: "POST",
    body: pagination,
    convertRes: (res) => {
      res.data.questions.map((item, index) => {
        item.stt = pagination.limit * (pagination.page - 1) + (index + 1);
        return item;
      });
      return {
        data: res.data.questions,
        info: res.info,
        session: res.data.session,
      };
    },
  };
};
export const sortQuestion = (dataBody: any): ParamsAxiosCallAPI => {
  return {
    endpoint: "/api/Survey/update/survey-order",
    method: "PUT",
    body: dataBody,
  };
};
export const createQuestionSession = (
  dataBody: Session
): ParamsAxiosCallAPI => {
  return {
    endpoint: "/api/Survey/multi",
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
export const deleteSessionQuestion = (id): ParamsAxiosCallAPI => {
  return {
    endpoint: `/api/Survey/${id}`,
    method: "DELETE",
  };
};
