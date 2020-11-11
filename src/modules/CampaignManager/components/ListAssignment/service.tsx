import { DataRequest } from "@components/commons/TableComponent_New/interface";
import { ParamsAxiosTableCallAPI , ParamsAxiosCallAPI } from "@interface/index";
import { getUserAssignment } from "@reducer/ListUserAssigment";


export const paramShowAllShareGroupCode = (dataBody:DataRequest , {groupCodeId}): ParamsAxiosTableCallAPI => {
    const params=dataBody
    return {
        endpoint:`/api/groupCode/showAllShareGroupCodes/${groupCodeId}`,
        method: 'GET',
        body: {params},
        action:getUserAssignment,
       convertRes: (res) => {
            return {
                data:res?.data?.pagedData,
                info:res.data.pageInfo
            }
        },
    };
};


export const paramDeleteShareGroupCode = (shareGroupCodeId): ParamsAxiosCallAPI => {
    
    return {
        endpoint:`/api/groupCode/ShareGroupCode/${shareGroupCodeId}`,
        method: 'DELETE',
    };
};