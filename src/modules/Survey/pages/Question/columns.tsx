import React from "react";
import { Divider } from "antd";
import { ColumnsType } from "antd/lib/table";
import { TYPE_QUESTION } from "@helper/variable";

export const getColumnsQuestion = (
  { onDelete, onUpdate },
  translatekey,
  language
): ColumnsType => {
  const {
    CONTENT,
    TYPE_QUESTION_COLUMNS,
    TOTAL_ANSWER,
    ACTION,
    DETAIL,
    DELETE,
  } = translatekey;
  return [
    {
      title: CONTENT,
      dataIndex: "content",
      key: "content",
      width: 140,
    },
    {
      title: TYPE_QUESTION_COLUMNS,
      dataIndex: "type",
      key: "type",
      width: 140,
      render: (value) => {
        return <span>{TYPE_QUESTION[value][language]}</span>;
      },
    },
    {
      title: TOTAL_ANSWER,
      dataIndex: "answers",
      key: "answers",
      width: 140,
      render: (value) => {
        return <span>{value && value.length}</span>;
      },
    },
    {
      title: "",
      dataIndex: "",
      key: "action",
      width: 50,
      render: (text, rowData) => (
        <>
          {/*<Divider type={"vertical"} />*/}
          <a className={" tag-a-btn tag-a-btn-normal"} onClick={() => onUpdate(rowData)}>
            {DETAIL}
          </a>
          <Divider type={"vertical"} />
          <a className={" tag-a-btn tag-a-btn-del"} onClick={() => onDelete(rowData)}>
            {DELETE}
          </a>
        </>
      ),
    },
  ];
};
