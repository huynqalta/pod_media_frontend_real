import { DatePicker } from "antd";
import React, { createContext, useEffect, useState } from "react";
import CircleReport from "../CircleReport";
import ColumnReport from "../ColumnReport";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import "./style.scss";
import { useApi } from "@server/apiCallAxios";
import {
  paramsReportDaily,
  paramsReportMonthly,
} from "@modules/Dashboard/service";
import { useTranslate } from "@shared/Hook";
import { LocationTranslateKey } from "@shared/TranslateKey/ImportTranslateKey";

export interface Iprops {
  type?: "Daily" | "Monthly";
  idDevice: string;
}
export interface IDaily {
  time?: string;
  success: number;
  error: number;
  date?: string;
}
export interface IData {
  totalRefill: number;
  dataRefill: Array<{
    timeReport: string;
    successShowReport: number;
    success: number;
    error: number;
    time?: string;
  }>;
}
const Report = ({ type, idDevice }: Iprops) => {
  const { DAILY_REPORT, MONTHLY_REPORT } = useTranslate(LocationTranslateKey);
  const [ data, setData ] = useState<IData>({
    totalRefill: 0,
    dataRefill: [],
  });
  const { execute } = useApi();
  const typeInitial = type || "Daily";
  const handleChangePicker = (value) => {
    const dateString = value.format("YYYY-MM-DD");
    handleCallData(dateString);
  };
  const handleCallData = (dateString: string) => {
    execute(
      typeInitial == "Daily"
        ? paramsReportDaily(dateString, idDevice)
        : paramsReportMonthly(dateString, idDevice)
    ).then((res) => {
      let successTotal = 0;
      let successBiggest = 0;

      res.forEach((y) => {
        successBiggest =
          y.success > successBiggest ? y.success : successBiggest;
        successTotal += y.success;
      });
      const dataConvert = res.map((item: IDaily) => {
        return {
          ...item,
          timeReport:
            typeInitial == "Daily"
              ? moment(item.time, "hh:mm:ss").format("LT")
              : moment(item.date).format("DD"),
          successShowReport:
            successBiggest != 0 ? (item.success / successBiggest) * 85 : 0,
        };
      });
      setData({
        totalRefill: successTotal,
        dataRefill: dataConvert,
      });
    });
  };
  useEffect(() => {
    const dateString = moment(new Date()).format("YYYY-MM-DD");
    handleCallData(dateString);
  }, []);

  return (
    <div className="report">
      <div className="report-header d-flex justify-content-between">
        <h6>{typeInitial == "Daily" ? DAILY_REPORT : MONTHLY_REPORT} </h6>
        <DatePicker
          picker={`${ typeInitial == "Daily" ? null : "month" }`}
          onChange={handleChangePicker}
          defaultValue={moment(new Date(), "YYYY/MM/DD")}
          format={`${ typeInitial == "Daily" ? "ddd, DD MMM" : "MMMM, YYYY" }`}
          className="date-picker-report"
          suffixIcon={<FontAwesomeIcon icon={faCalendarAlt} />}
          allowClear={false}
        />
      </div>
      <div className="report-content d-flex justify-content-between">
        <CircleReport
          type={typeInitial}
          refills={data.totalRefill}
          key={data.totalRefill}
        />
        <div className="report-chart d-flex justify-content-between">
          {data.dataRefill.map((item, index) => (
            <ColumnReport item={item} key={index} type={typeInitial} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default React.memo(Report);
