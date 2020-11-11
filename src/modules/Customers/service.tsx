export const newCustomer = (raw?: any) => {
  return {
    endpoint: `/api/customer`,
    method: 'POST',
    body: raw,
  };
};

export const editCustomer = (id?: any, raw?: any) => {
  return {
    endpoint: `/api/CustomerManage/${id}`,
    method: 'PUT',
    body: raw,
  };
};
export const delCustomer = (id?: any) => {
  return {
    endpoint: `/api/CustomerManage/${id}`,
    method: 'DELETE',
  };
};

export const listCustomer = (raw?: any) => {
  return {
    endpoint: `/api/CustomerManage/showTable`,
    method: 'POST',
    body: raw,
    convertRes: (res) => res.data,
  };
};
export const SurveyCustomer = (body?: any) => {
  return {
    endpoint: `/api/Answers/filter`,
    method: 'POST',
    body,
  };
};

export const detailCustomer = (id?: any, raw?: any) => {
  return {
    endpoint: `/api/historyUserMedical/historyCustomerCMS/${id}`,
    method: 'POST',
    body: raw,
    convertRes: (res) => res.data,
  };
};
