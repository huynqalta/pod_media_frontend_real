import { useSelector } from "react-redux";

import { ListUserAssigmentReducerName } from "@reducer/ListUserAssigment";
import { RootState } from "@reducer/RootReducer";

const selector = (state: RootState) => {
  return state[ListUserAssigmentReducerName];
};

const useListAssignment = () => {
  const state = useSelector(selector);
  
  return {
    listUserAssign: state["listUserAssign"] || [],
    status: state["status"] || "init",
  };
};

export default useListAssignment;
