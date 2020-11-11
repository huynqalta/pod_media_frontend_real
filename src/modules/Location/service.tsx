import { DataRequest } from "@components/commons/ListComponent/interface";
import { ParamsAxiosTableCallAPI } from "@interface/index";

export const paramsGetAllLocation = (
  dataBody: DataRequest
): ParamsAxiosTableCallAPI => {
  return {
    endpoint: `/api/location/showAll`,
    method: "GET",
    body: { params: dataBody },
    convertRes: (res) => {
      return {
        data: res?.data?.pagedData,
        info: res.data.pageInfo,
      };
    },
  };
};

export const paramsDeleteLocation = (id) => {
  return {
    endpoint: `/api/location/delete/${id}`,
    method: "DELETE",
  };
};

export const paramsDetailsOfLocation = (id) => {
  return {
    endpoint: `/api/location/detail/${id}`,
    method: "GET",
    convertRes: (res) => {
      return res.data;
    },
  };
};

export const paramsUploadLocation = (id, data, media, location) => {
  const postData = new FormData();
  postData.append("locationName", data?.locationName);
  postData.append("locationLongtitue", location?.lng);
  postData.append("locationLatitude", location?.lat);
  postData.append("locationAddress", data?.locationAddress);
  postData.append("locationId", id);
  postData.append("locationImage", media);

  return {
    endpoint: `/api/location/update`,
    method: "PUT",
    body: postData,
  };
};

export const paramsStoreLocation = (data, media, location) => {
  const postData = new FormData();
  postData.append("locationName", data?.locationName);
  postData.append("locationLongtitue", location.lng);
  postData.append("locationLatitude", location.lat);
  postData.append("locationAddress", data?.locationAddress);

  postData.append("locationImage", media);

  return {
    endpoint: `/api/location/store`,
    method: "POST",
    body: postData,
  };
};

export const paramsUpdateStatusLocation = (data) => {
  const postData = new FormData();
  postData.append("locationStatus", !data?.locationStatus ? "1" : "0");
  postData.append("locationId", data.locationId);
  return {
    endpoint: `/api/location/update`,
    method: "PUT",
    body: postData,
  };
};
