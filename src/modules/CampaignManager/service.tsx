import { DataRequest } from "@components/commons/TableComponent_New/interface";
import { ParamsAxiosCallAPI , ParamsAxiosTableCallAPI} from "@interface/index";
import { RSA_NO_PADDING } from "constants";

export const importCode = (dataBody:{
    "GroupCodeId": string,
    "Codes": {codeValue:string}[]
}): ParamsAxiosCallAPI => {
    return {
        endpoint: '/api/codeDevice/import',
        method: 'POST',
        body: dataBody,
      
    };
};
export const paramsGetListGroupCode = (dataBody:DataRequest): ParamsAxiosTableCallAPI => {
   const params = {orderByQuery:"updatedAt desc",... dataBody}
    return {
        endpoint: `/api/groupCode`,
        method: 'GET',
       body:{params},
        convertRes: (res) => {
            return {
                data:res?.data?.pagedData,
                info:res.data.pageInfo
            }
        },
    };
};
export const paramsRemoveListGroupCode = (groupCodeId:string): ParamsAxiosCallAPI => {
    
     return {
         endpoint: `/api/groupCode/${groupCodeId}`,
         method: 'DELETE'
     };
 };