export const paramsListUser = () => {
  return {
    endpoint: `/api/user`,
    convertRes: (res) => {
      return res.data;
    },
  };
};
export const paramsAddUser = (data) => {
  return {
    endpoint: `/api/user`,
    method: 'POST',
    body: data,
  };
};
export const paramsPaginationUser = (data) => {
  return {
    endpoint: `/api/user/showTable`,
    method: 'POST',
    body: data,
  };
};
