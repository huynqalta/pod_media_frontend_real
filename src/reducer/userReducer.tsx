import { DataStatus } from '@interface/index';
import { createSlice } from '@reduxjs/toolkit';

interface InitState {
  listUser: Array<any>;
  listAllUser: Array<any>;
  total: Number;
  currentPage: Number;
  status:DataStatus
}

const initialState: InitState = { listAllUser:[],listUser: [], total: 0, currentPage: 1  , status:"init"};
//dùng cơ chế save draft state nên không cần dùng {...state}. chỉ cần thay đổi giá trị cần thiết
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUser(state, action) {
      state.listUser = action.payload;
      
    },
    getAllUser(state, action) {
      state.listAllUser = action.payload;
      state.status =  "success"
    },
    updateUser(state, action){
      state.listUser = action.payload;
      state.status =  "modified"
    },
    setTotal(state, action) {
      state.total = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
});

export const { getUser, setTotal, setCurrentPage, getAllUser , updateUser } = userSlice.actions;
export const userReducerName = userSlice.name;
export default userSlice.reducer;
