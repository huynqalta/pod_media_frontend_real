import { DataStatus } from "@interface/index";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type DataStatusBreadcrumb = "success" | "init" | "modified"

interface breadcrumb { path: string; breadcrumbName: string }
interface ListUserAssigmentState {
  listUserAssign: Array<any>;
  status:DataStatus;
  campaignId:string //groupcodeId
}

const initialState: ListUserAssigmentState = { listUserAssign: [] , status:"init" , campaignId:""};

//dùng cơ chế save draft state nên không cần dùng {...state}. chỉ cần thay đổi giá trị cần thiết
const ListUserAssigmentSlice = createSlice({
  name: "ListUserAssigment",
  initialState,
  reducers: {
    getUserAssignment(state, {payload}: PayloadAction<any>) {
     
      const {data,  campaignId } = payload
      state.listUserAssign = data;
      state.status =  "success";
      state.campaignId = campaignId? campaignId : ""
      return state
    },
   
    assignListUser(state, {payload}: PayloadAction<any>) {
      
      if(payload && payload.length > 0)  {
        state.listUserAssign =  [...state.listUserAssign, ...payload]
      }
      // state.status = "modified"
      return state
    },
    removeUser(state, {payload}: PayloadAction<any>) {
      const prevListUserAssign = JSON.parse(JSON.stringify(state.listUserAssign))
     
      const index = prevListUserAssign.findIndex(i => i["userId"] == payload)
      
      if(index != -1)  {
        state.listUserAssign =  prevListUserAssign.splice(index , 1)
      }
      // state.status = "modified"
      return state
    },
    updateStatus(state, {payload}: PayloadAction<any>) {
      
      state.status = payload
      return state
    },
  },
});

export const { getUserAssignment , assignListUser , removeUser , updateStatus } = ListUserAssigmentSlice.actions;
export const ListUserAssigmentReducerName = ListUserAssigmentSlice.name;
export default ListUserAssigmentSlice.reducer;
