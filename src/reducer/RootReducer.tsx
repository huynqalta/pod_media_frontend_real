import { combineReducers, configureStore } from "@reduxjs/toolkit";

import loginReducer from "./loginReducer";
import detailDeviceReducer, { detailDeviceReducerName } from "./detailDeviceReducer";
import BreadcrumbReducer, { BreadcrumbReducerName } from "./BreadcrumbReducer";
import ListUserAssigmentReducer, { ListUserAssigmentReducerName } from "./ListUserAssigment";
import userReducer from "./userReducer";

const store = configureStore({
  reducer: {
    login: loginReducer,
    [detailDeviceReducerName]: detailDeviceReducer,
    [BreadcrumbReducerName]: BreadcrumbReducer,
    [ListUserAssigmentReducerName]: ListUserAssigmentReducer,
    user: userReducer,
  },
});
export default store;

const rootReducer = combineReducers(store);

export type RootState = ReturnType<typeof rootReducer>;
