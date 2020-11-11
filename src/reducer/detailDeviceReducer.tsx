import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface payloadData {
  data: DetailDeviceData;
}
interface DetailDeviceData {
  dataLog: Array<any>;
  infoDevice: Object;
}
const initialState: DetailDeviceData = { infoDevice: {}, dataLog: [] };

//dùng cơ chế save draft state nên không cần dùng {...state}. chỉ cần thay đổi giá trị cần thiết
const detailDeviceReducer = createSlice({
  name: "detailDevice",
  initialState,
  reducers: {
    setDetailDevice: (state, { payload }: PayloadAction<DetailDeviceData>) => {
      state.infoDevice = payload.infoDevice || {};
      state.dataLog = payload.dataLog || [];
      return state;
    },
  },
});

export const { setDetailDevice } = detailDeviceReducer.actions;
export const detailDeviceReducerName = detailDeviceReducer.name;
export default detailDeviceReducer.reducer;
