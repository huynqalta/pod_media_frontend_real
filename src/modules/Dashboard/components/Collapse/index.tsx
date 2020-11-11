import React, { useContext } from "react";
import { Collapse } from "antd";
import "./style.scss";
import DetailDeviceDashboard from "../DetailDeviceDashboard";
import { useParams } from "react-router";
import { DeviceDashboardContext } from "../DeviceDashboard";
const { Panel } = Collapse;
function callback(key) {
  console.log(key);
}
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
const data = {
  name: "Pod Hi Pro #1",
  des: "Floor B1 - East",
};
const HeaderCollapse = ({ data }) => {
  return (
    <div className="d-flex align-items-center header-custom-collapse">
      <h5 className="mb-0">{data.deviceName}</h5>
      {/* <h6 className="mb-0">{data.address}</h6> */}
    </div>
  );
};

const CollapseComponent = ({ listDevice }) => {
  return (
    <>
      {listDevice && (
        <Collapse
          defaultActiveKey={["0"]}
          onChange={callback}
          expandIconPosition={"right"}
          className="custom-collapse"
        >
          {listDevice.map((item, index) => (
            <Panel
              header={<HeaderCollapse data={item} />}
              key={index.toString()}
            >
              <DetailDeviceDashboard item={item} key={item.id} />
            </Panel>
          ))}
        </Collapse>
      )}
    </>
  );
};
export default React.memo(CollapseComponent);
