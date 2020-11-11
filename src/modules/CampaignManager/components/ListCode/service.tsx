import { DataRequest } from "@components/commons/TableComponent_New/interface";
import { ParamsAxiosCallAPI, ParamsAxiosTableCallAPI } from "@interface/index.tsx";

export const paramsGetList = (dataBody:DataRequest,{groupCodeId}):ParamsAxiosTableCallAPI =>{
    const params = dataBody;
    return {
        endpoint:`/api/codeDevice/codeInGroup/${groupCodeId}`,
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
export const paramsUpDateStatus = ( groupCodeId):ParamsAxiosCallAPI =>{
    
    return {
        endpoint:`/api/codeDevice/changeStatus/${groupCodeId}`,
        method:"PUT",
    }
}