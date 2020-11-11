export interface RequestCreateCampaignCode {
    groupCodeName:string,
    importCodeRequest:{
        Codes:{codeValue:string}[]
    },
    createShareGroupCodeRequest:{
        userId:string[]
    }
}