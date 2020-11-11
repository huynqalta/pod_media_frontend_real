import React, { useCallback, useEffect, useState } from "react";
import { Button, Col, Collapse, Row } from "antd";
import "./style.scss";
import DetailDeviceDashboard from "../../../Dashboard/components/DetailDeviceDashboard";
import { useHistory, useParams } from "react-router";
import moment from "moment";
import { faMap } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter, useTranslate } from "@shared/Hook";
import { LocationTranslateKey } from "@shared/TranslateKey/ImportTranslateKey";
import { DEVICES, DEVICE_MAP, EDIT_ADD } from "@modules/router-paths";
import Content from "../Content";
const { Panel } = Collapse;

const HeaderCollapse = ({ data, handleStatistic, statistic }) => {
  const router = useRouter();
  const history = useHistory();
  const { EDIT, STATIC, DETAIL, VIEW_ON_MAP } = useTranslate(LocationTranslateKey);
  return (
    <div className="d-flex align-items-center header-custom-collapse">
      <h5 className="mb-0">{data.deviceName}</h5>
      <div className="action_Colappse">
        <Button onClick={(e) => handleStatistic(e, data)}>
          {!statistic ? STATIC : DETAIL}
        </Button>
        <Button
          onClick={() => {
            router.push({
              pathname: EDIT_ADD,
              search: `?key=${data["deviceId"]}`,
            });
          }}
        >
          {EDIT}
        </Button>
        <Button onClick={() => { history.push(`${DEVICE_MAP}/${data.locationId}/${data.deviceId}`) }}>
          {VIEW_ON_MAP}
        </Button>
      </div>
    </div>
  );
};

const CollapseComponent = ({ devices }) => {
  const { id, type }: any = useParams();
  const [showStatistic, setShowStatic] = useState<Array<any>>([]);
  const handleShowStatistic = useCallback(
    (e, data) => {
      const dataFind = showStatistic.find((x) => x == data.deviceId);
      dataFind
        ? setShowStatic((pre) => pre.filter((y) => y != data.deviceId))
        : setShowStatic((pre) => [...pre, data.deviceId]);
      e.stopPropagation();
    },
    [showStatistic]
  );
  function callback(key) {
    console.log(key);
  }
  return (
    <div className="collapse_Location">
      <Collapse
        defaultActiveKey={["0"]}
        onChange={callback}
        expandIconPosition={"right"}
        className="custom-collapse"
        accordion
      >
        {devices?.map((item, index) => (
          <Panel
            header={
              <HeaderCollapse
                data={item}
                handleStatistic={handleShowStatistic}
                statistic={showStatistic.find((x) => x == item.deviceId)}
              />
            }
            key={index}
          >
            <Content
              item={item}
              key={item.deviceId}
              statistic={showStatistic.find((x) => x == item.deviceId)}
            />
          </Panel>
        ))}

        {/* 
      <Panel header={<HeaderCollapse data={data} />} key="3">
        <p>{text}</p>
      </Panel> */}
      </Collapse>
    </div>

  );
};
export default React.memo(CollapseComponent);
