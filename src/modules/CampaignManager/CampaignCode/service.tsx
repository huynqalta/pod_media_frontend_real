import { DataRequest } from "@components/commons/TableComponent_New/interface";
import { ParamsAxiosCallAPI, ParamsAxiosTableCallAPI } from "@interface/index";
import {RequestCreateCampaignCode} from "./interface"



export const createGroupCode = (dataBody:RequestCreateCampaignCode): ParamsAxiosCallAPI => {
    // const tempRequest =  dataBody
    // if(!dataBody.createShareGroupCodeRequest.userId){
    //     tempRequest.createShareGroupCodeRequest == null;
    // }
    return {
        endpoint:'/api/groupCode/createAndImportCode',
        method: 'POST',
        body: dataBody,
        // convertRes: (res) => {
        //     return res.data
        // },
    };
};


export const updateGroupCode = (groupCodeName , groupCodeId): ParamsAxiosCallAPI => {
    return {
        endpoint:`/api/groupCode/${groupCodeId}`,
        method: 'PUT',
        body: {groupCodeName},
        // convertRes: (res) => {
        //     return res.data
        // },
    };
};
export const paramsAsignForGroup = (List:string[] , groupCodeId:string): ParamsAxiosCallAPI => {
    
    return {
        endpoint:`/api/groupCode/createShareGroupCode`,
        method: 'POST',
        body: {
            groupCodeId,
            userId:List
        },
      
    };
};