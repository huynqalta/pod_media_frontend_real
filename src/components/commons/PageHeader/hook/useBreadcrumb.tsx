import { useSelector } from "react-redux";

import { BreadcrumbReducerName } from "@reducer/BreadcrumbReducer";
import { RootState } from "@reducer/RootReducer";

const selector = (state: RootState) => {
  return state[BreadcrumbReducerName];
};

const useBreadcrumb = () => {
  const state = useSelector(selector);

  return {
    routers:state.routers,
    status:state.status
  };
};

export default useBreadcrumb;
