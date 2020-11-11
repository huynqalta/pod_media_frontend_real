import React from "react";
import CollapseComponent from "@modules/Dashboard/components/Collapse";
const DeviceDashboard = () => {
  return (
    <div style={{ width: "70%", marginLeft: "auto" }}>
      <CollapseComponent />
    </div>
  );
};
export default React.memo(DeviceDashboard);
