export const paramsListLocation = () => {
  return {
    endpoint: `/api/location/showAll`,
    method: "GET",
    convertRes: (res) => {
      return res.data.pagedData;
    },
  };
};

export const paramsDetailLocation = (id: string) => {
  return {
    endpoint: `/api/location/detail/${ id }`,
    method: "GET",
    convertRes: (res) => {
      return res.data.devices;
    },
  };
};

export const paramsReportMonthly = (dateString: string, idDevice: string) => {
  return {
    endpoint: `/api/Device/reportRefillMonthly?date=${ dateString }&deviceId=${ idDevice }`,
    method: "GET",
    convertRes: (res) => {
      return res.data;
    },
  };
};

export const paramsReportDaily = (dateString: string, idDevice: string) => {
  return {
    endpoint: `/api/Device/reportRefillDaily?date=${ dateString }&deviceId=${ idDevice }`,
    method: "GET",
    convertRes: (res) => {
      return res.data;
    },
  };
};
