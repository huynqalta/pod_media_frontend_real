import { useSelector } from "react-redux";

import { detailDeviceReducerName } from "@reducer/detailDeviceReducer";
import { RootState } from "@reducer/RootReducer";

const selector = (state: RootState) => {
  return state[detailDeviceReducerName];
};

const useDetailDevice = () => {
  const state = useSelector(selector);

  return {
    infoDevice: state["infoDevice"] || {},
    dataLog: state["dataLog"] || [],
  };
};

export default useDetailDevice;
