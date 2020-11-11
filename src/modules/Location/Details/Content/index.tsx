import { useTranslate } from "@shared/Hook";
import React from "react";
import { Col, Row } from "antd";
import { LocationTranslateKey } from "@shared/TranslateKey/ImportTranslateKey";
import moment from "moment";
import DetailDeviceDashboard from "@modules/Dashboard/components/DetailDeviceDashboard";
import "./style.scss";

const Content = ({ item, statistic }) => {
  console.log(statistic, item);
  const {
    DEVICE,
    LANG,
    LAT,
    STATUS,
    SETTING,
    KEY,
    VALUE,
    LAST_UPDATE,
    TYPE
  } = useTranslate(LocationTranslateKey);

  return (
    <>
      {statistic ? (
        <div className={`${statistic && "show-statistic"}`}>
          <DetailDeviceDashboard item={item} />
        </div>
      ) : (
          <div className="show-detail">
            <Row>
              <Col span={12}>
                <h6 style={{
                  fontSize: "16px"
                }}>{DEVICE}</h6>
                {/* <div className="rowDetailDevice">
          <p>Type:</p><span>{item.}</span>
        </div> */}
                <div className="rowDetailDevice">
                  <p>{LANG}:</p>
                  <span>{item.longitude}</span>
                </div>
                <div className="rowDetailDevice">
                  <p>{LAT}:</p>
                  <span>{item.latitude}</span>
                </div>
                <div className="rowDetailDevice">
                  <p>{LAST_UPDATE}:</p>
                  <span>{moment(item.createdAt).format("DD-MM-YYYY")}</span>
                </div>
                <div className="rowDetailDevice">
                  <p>{STATUS}:</p>
                  <span>
                    {item.status == -1 ? "New device" : "Device active"}
                  </span>
                </div>
                <div className="rowDetailDevice">
                  <p>{TYPE}:</p>
                  <span>
                    {item.deviceType == 1 ? "POD Hi-Pro" : item.deviceType == 2 ? "POD Refresh" : "POD Vital"}
                  </span>
                </div>
              </Col>
              {!!item.setting && (
                <Col span={12}>
                  <h6 style={{
                    fontSize: "16px"
                  }}>{SETTING}</h6>
                  <div className="rowDetailDevice">
                    <p style={{ margin: "0px" }}>{KEY}:</p>
                    <p style={{ margin: "0px" }}>{VALUE}:</p>
                  </div>
                  <div className="rowDetailDevice">
                    <div className="rowDevice_left">
                      {Object.keys(item.setting).map(item => <p style={{ display: "block" }}>{item}</p>)}
                    </div>
                    <div className="rowDevice_right">
                      {Object.values(item.setting).map(item => <p>{item}</p>)}
                    </div>
                  </div>
                </Col>
              )}
            </Row>
          </div>
        )}
    </>
  );
};
export default React.memo(Content);
