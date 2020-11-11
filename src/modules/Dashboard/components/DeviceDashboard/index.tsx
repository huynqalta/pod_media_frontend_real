import React, { createContext, useEffect, useState } from "react";
import "./style.scss";
import CollapseComponent from "@modules/Dashboard/components/Collapse";
import { useParams } from "react-router";
import { useApi } from "@server/apiCallAxios";
import { paramsDetailLocation } from "@modules/Dashboard/service";
import { Empty } from "antd";
import { useTranslate } from "@shared/Hook";
import { LocationTranslateKey } from "@shared/TranslateKey/ImportTranslateKey";
interface IParams {
  id: string;
  type: string;
}
export const DeviceDashboardContext = createContext(null);

const DeviceDashboard = ({ position }) => {
  const { TOTAL, MACHINES, LIST_DEVICE, SHOWING } = useTranslate(
    LocationTranslateKey
  );
  const { id, type }: IParams = useParams();
  const callDetailLocation = useApi<Array<any>>({ useRes: true, initRes: [] });
  useEffect(() => {
    if (id) {
      callDetailLocation.execute(paramsDetailLocation(id));
    }
  }, [id]);

  return (
    <div className="device-dashboard">
      <h4>{LIST_DEVICE}</h4>
      <p style={{ fontWeight: "bold", fontSize: "18px", marginBottom: "3px" }}>
        {TOTAL} {callDetailLocation.res.length} {MACHINES}
      </p>
      <p style={{ fontStyle: "italic", fontSize: "16px", opacity: "0.5" }}>
        {SHOWING} {callDetailLocation.res.length}/
        {callDetailLocation.res.length} {MACHINES}
      </p>
      {callDetailLocation.res.length > 0 ? (
        <CollapseComponent listDevice={callDetailLocation.res} />
      ) : (
        <div className="device-dashboard-empty">
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="Không có thiết bị"
          />
        </div>
      )}
    </div>
  );
};
export default React.memo(DeviceDashboard);
