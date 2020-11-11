import React from "react";
import Report from "../Report";
import GeneralDevice from "./../GeneralDetail";
const DetailDeviceDashboard = ({ item }) => {

  return (
    <div>
      {item.deviceStatusActive && <GeneralDevice generalDevice={item} />}
      <Report idDevice={item.deviceId} />
      <Report type={"Monthly"} idDevice={item.deviceId} />
    </div>
  );
};
export default React.memo(DetailDeviceDashboard);
