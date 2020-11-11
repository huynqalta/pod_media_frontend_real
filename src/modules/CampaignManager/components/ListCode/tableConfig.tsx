import React from "react";

import { Link } from "react-router-dom";
import {  Divider, Tag } from "antd";
import { ColumnsType } from "antd/lib/table";
import { CAMPAIGN_DETAIL, DEVICE_DETAIL } from "@modules/router-paths";
import moment from "moment"
import { DD_MM_YYYY, DD_MM_YYYY_HH_mm, DD_MM_YYYY_HH_mm_ss } from "@helper/variable";


export const getColumns = (
  {onChangeStatus ,isOwner},
  translatekey
): ColumnsType => {
  const {
    STATUS,
    DATE_IMPORT,
    CODE_NAME,
    ACTIVE,
    DEACTIVE,
    DATE_USE,
    DEVICE_USED,
    SCANED
  } = translatekey;
const renderStatus = ({status , onChangeStatus , codeDeviceId})=>{
  switch(status){
    case 1:
      return <Tag className={`${isOwner && "cursor-pointer"}`} onClick={()=>onChangeStatus(codeDeviceId)} color="success">{ACTIVE}</Tag>
    case 2:
  return <Tag color="geekblue">{SCANED}</Tag>
    default:
      return <Tag className={`${isOwner && "cursor-pointer"}`} onClick={()=>onChangeStatus(codeDeviceId)} color="error">{DEACTIVE}</Tag>
  }
}
  return [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: 50,
    },
    {
      title: CODE_NAME,
      dataIndex: "codeValue",
      key: "codeValue",
      width: 300,
      
    },
    {
      title: DATE_IMPORT,
      dataIndex: "createdAt",
      key: "createdAt",
      width: 200,
      render:(text) =><span>{moment(text).format(DD_MM_YYYY_HH_mm)}</span>
    },
    {
      title: STATUS,
      dataIndex: "statusCode",
      key: "statusCode",
      className:"text-center",
      width: 50,
      render:(text , record)=>{
        return <span>{renderStatus({status:text, onChangeStatus, codeDeviceId:record["codeDeviceId"]})}</span>
      }
    },
    {
      title: DEVICE_USED,
      dataIndex: "deviceResponse",
      key: "deviceResponse",
      width: 200,
      render:(deviceResponse , record)=>{
        let name = deviceResponse?.deviceName;
        if(!!name){
          name += ` (${deviceResponse?.latitude}, ${deviceResponse?.longitude})`
        }
      return <span>{name} </span>
      }
    },
    {
      title: DATE_USE,
      dataIndex: "scannedAt",
      key: "scannedAt",
      width: 200,
      render:(text) =><span>{text && moment(text).format(DD_MM_YYYY_HH_mm)}</span>
    },
    
    
  ];
};
