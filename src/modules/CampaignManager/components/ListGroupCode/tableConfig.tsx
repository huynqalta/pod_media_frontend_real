import React from "react";

import { Link } from "react-router-dom";
import {  Checkbox, Col, Divider , List, Row, Tag } from "antd";
import { ColumnsType } from "antd/lib/table";
import { CAMPAIGN_DETAIL, CAMPAIGN_UPDATE } from "@modules/router-paths";
import moment from "moment"
import {DD_MM_YYYY_HH_mm_ss} from "@helper/variable"





export const getRenderItem = ( { onDelete, importCode},translatekey , item,  index) => {
  const {
    CAMPAIGN_NAME,
    UPDATED_AT,
    CREATED_AT,
    TOTAL_CODE,
    CODE_USED,
    VIEW_LIST_CODE,
    IMPORT_CODE,
    DELETE,
    OWNER,
    UPDATE,
  } = translatekey;

  // const onSubmit = (value) => {
  //   console.log(value);
  // };
  const isOwner = item.userType === 1;
  const totalCode = item.codeTotal || "0"
  const totalUsed = item.codeUseTotal || "0"
  
  return  (
      <List.Item
        key={item.groupCodeId}
        actions={[
          <div key={"action"} className="d-flex justify-content-end">
        {
        
            <Link
            className={`action ${!isOwner && "disabled"} action-normal`}
            to={{
              pathname:`${CAMPAIGN_UPDATE}/${item["groupCodeId"]}`,
              search:`Campaign=${item["groupCodeName"]}`
            }}
           
          >
            {UPDATE}
          </Link>
        
        }
          <Link
            className={" action action-normal"}
            to={{
              pathname:`${CAMPAIGN_DETAIL}/${item["groupCodeId"]}`,
              search:`Campaign=${item["groupCodeName"]}${item.userType?"&userType":""}`
            }}
          >
            {VIEW_LIST_CODE}
          </Link>
    
            <a className={`action ${!isOwner && "disabled"} action-normal`} onClick={() => importCode(item)}>
              {IMPORT_CODE}
            </a>
        
            <a className={`action ${!isOwner && "disabled"} action-del`} onClick={() => onDelete(item)}>
              {DELETE}
            </a>
         
          </div>
          ]}
      >
        <div className="w-100">
          <Row>
            <Col span={14}>
              <List.Item.Meta
                    title={item.groupCodeName}
                    description={moment(item.updatedAt).format(DD_MM_YYYY_HH_mm_ss)}
                  />
            </Col>
            <Col span={2}  className="d-flex align-items-center justify-content-center">
              {
              isOwner &&
              <Tag color="purple">{OWNER}</Tag>
              }
            </Col>
            <Col className="text-center" span={4}>
              <List.Item.Meta
                title={totalCode +""}
                description={TOTAL_CODE}
                  />
                  </Col>
            <Col className="text-center" span={4}>
              <List.Item.Meta
                  title={totalUsed +""}
                  description={CODE_USED}
                  />
            </Col>
          </Row>
       </div>
    </List.Item>
      )
  }
  
