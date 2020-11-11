import { ParamsAxiosCallAPI } from "@interface/index";
import { setDetailDevice } from "@reducer/detailDeviceReducer";
export const getDetailDevice = (id): ParamsAxiosCallAPI => {
  return {
    endpoint: `/api/device/${id}`,
    action: setDetailDevice,
    convertRes: res => {
      return { infoDevice: res.data };
    },
  };
};
export const getLogsDeviceById = (pagination, { id }): ParamsAxiosCallAPI => {
  return {
    endpoint: `/api/device/logsWithDevice/${id}`,
    method: "POST",
    body: pagination,
    convertRes: res => {
      res.data.map((item, index) => {
        item.stt = pagination.limit * (pagination.page - 1) + (index + 1);
        return item;
      });
      return { data: res.data, info: res.info };
    },
  };
};
