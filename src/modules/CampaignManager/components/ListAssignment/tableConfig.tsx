import React from "react";

import { Link } from "react-router-dom";
import {  Divider, Tag } from "antd";
import { ColumnsType } from "antd/lib/table";
import { CAMPAIGN_DETAIL, DEVICE_DETAIL } from "@modules/router-paths";



export const getColumns = (
  {onDelete},
  translatekey
): ColumnsType => {
  const {
    ACTION,
  USER,
  DELETE
  } = translatekey;

  // const onSubmit = (value) => {
  //   console.log(value);
  // };

  return [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: 50,
    },
    {
      title: USER,
      dataIndex: "userName",
      key: "userName",
      render:(text, rowData)=>{
        
      return <span>{text} {rowData["userType"] == 1 && <Tag color="green">Is't you</Tag>}</span>
      }
    },
    {
      title: "Email",
      dataIndex: "userEmail",
      key: "userEmail",
    },
    {
      title: "",
      dataIndex: "",
      key: "",
      className:"text-center",
      width: 100,
      render:(text, rowData)=>{
        if(rowData["userType"] == 1 ) return ""
        return <a className={"text-danger"} onClick={() => onDelete(rowData)}>
        {DELETE}
      </a>
      }
    },
    
  ];
};
