import {ParamsAxiosCallAPI} from '@interface/index';


export const getDevices = (pagination): ParamsAxiosCallAPI => {
    return {
        endpoint: '/api/device/show',
        method: 'POST',
        body: pagination,
        convertRes: (res) => {
            res.data.data.map((item, index) => {
                item.stt = pagination.limit * ((pagination.page?pagination.page :1) - 1) + (index + 1);
                return item;
            });
            return {data: res.data.data, info: res.info};
        },
    };
};
export const createDevice = (dataBody?: any): ParamsAxiosCallAPI => {
    return {
        endpoint: `/api/Device`,
        method: 'POST',
        body: dataBody,
    };
};

export const delGroupDevice = (id): ParamsAxiosCallAPI => {
    return {
        endpoint: `/api/groupDevice/${id}`,
        method: 'DELETE',
    };
};
export const createGroupDevice = (dataBody): ParamsAxiosCallAPI => {
    return {
        endpoint: '/api/groupDevice',
        method: 'POST',
        body: dataBody,
    };
};
export const plusDeviceGroup = (id,dataBody): ParamsAxiosCallAPI => {
    return {
        endpoint: `/api/groupDevice/assignDevice/${id}`,
        method: 'POST',
        body: dataBody,
    };
};

export const listGroupDevice = (dataBody): ParamsAxiosCallAPI => {
    const raw = {
        PageNumber: dataBody.page || 1,
    };
    return {
        endpoint: `/api/GroupDevice?PageSize=10&PageNumber=${raw.PageNumber}&OrderByQuery=""&SearchContent=""`,
        method: 'GET',
        convertRes: (res) => {
            return {
                data:res.data.pagedData,
                info:res.data.pageInfo
            }
        },
    };
};
export const updateDevice = (
    id: string,
    dataBody: any
): ParamsAxiosCallAPI => {
    return {
        endpoint: `/api/Device/${id}`,
        method: 'PUT',
        body: dataBody,
    };
};
export const deleteDevices = (id): ParamsAxiosCallAPI => {
    return {
        endpoint: `/api/device/${id}`,
        method: 'DELETE',
    };
};
export const showCodeActive = (id): ParamsAxiosCallAPI => {
    return {
        endpoint: `/api/device/getCodeActive/${id}`,
        method: 'GET',
    };
};
export const detailDevice = (id): ParamsAxiosCallAPI => {
    return {
        endpoint: `/api/device/${id}`,
        method: 'GET',
    };
};
export const delDeviceFormGroup = (raw): ParamsAxiosCallAPI => {
    return {
        endpoint: `/api/GroupDeviceUser/delete/bulk`,
        method: 'POST',
        body: raw,
    };
};
export const getAllUser = (): ParamsAxiosCallAPI => {
    return {
        endpoint: `/api/user`,
        method: 'GET',
        convertRes: (res) => {
            return res.data
        },
    };
};

export const getAllCode = (): ParamsAxiosCallAPI => {
    return {
        endpoint: `/api/groupCode?pageNumber=1&orderByQuery=updatedAt+desc`,
        method: 'GET',
        convertRes: (res) => {
            return res.data.pagedData
        },
    };
};
export const getAllSurvey = (): ParamsAxiosCallAPI => {
    return {
        endpoint: `/api/Session/Pagination?pageNumber=1&orderByQuery&searchContent`,
        method: 'GET',
        convertRes: (res) => {
            return res.data.pagedData
        },
    };
};
export const getAllGroupDevice = (): ParamsAxiosCallAPI => {
    return {
        endpoint: `/api/GroupDevice`,
        method: 'GET',
        convertRes: (res) => {
            return res.data.pagedData
        },
    };
};
