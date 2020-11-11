import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type DataStatusBreadcrumb = "success" | "init" | "modified"

interface breadcrumb { path: string; breadcrumbName: string }
interface BreadcrumbState {
  routers: Array<breadcrumb>;
  status:DataStatusBreadcrumb
}

const initialState: BreadcrumbState = { routers: [] , status:"init"};

//dùng cơ chế save draft state nên không cần dùng {...state}. chỉ cần thay đổi giá trị cần thiết
const BreadcrumbSlice = createSlice({
  name: "router",
  initialState,
  reducers: {
    Breadcrumb(state, {payload}: PayloadAction<any>) {
      const {routers, status } = payload
      state.routers = routers;
      state.status =  status || "init";
  return state
    },
  },
});

export const { Breadcrumb } = BreadcrumbSlice.actions;
export const BreadcrumbReducerName = BreadcrumbSlice.name;
export default BreadcrumbSlice.reducer;
