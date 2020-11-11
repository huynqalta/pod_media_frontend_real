import React from "react";

import { ColumnsType } from "antd/lib/table";
import moment from "moment";

export const getColumns = (): ColumnsType => {
  return [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: 50,
    },
    {
      title: "Nội Dung",
      dataIndex: "content",
      key: "content",
      width: 400,
    },
    {
      title: "Ngày Tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 100,
      render: text => {
        return moment(text).format("DD/MM/YYYY");
      },
    },
  ];
};
