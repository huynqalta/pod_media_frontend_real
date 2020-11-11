import React from "react";
import { Tag } from "antd"
import { useTranslate } from "@shared/Hook";
import { CampaignTranslateKey } from "@shared/TranslateKey/ImportTranslateKey";

export const renderStatusImportCode =  (status) =>{
  const {EXISTED, NEW, DUPLICATE} = useTranslate(CampaignTranslateKey)
    switch(status){
      // case 0:
      //   return <Tag color="success">Success</Tag> 
      case 1:
        return <Tag color="purple">{EXISTED}</Tag> 
      case 2:
        return <Tag color="volcano">{DUPLICATE}</Tag> 
      default:
        return  <Tag color="geekblue">{NEW}</Tag> 
    }
  } 

export const getColumns = ({handleDelete} , useTranslate) => {
    let {DELETE , NEW,
      EXISTED,
      DUPLICATE} =  useTranslate
    if(!DELETE){
        DELETE = "Delete"
    }
    return ([
    {
      title:"STT",
      dataIndex:"stt",
      key:"code",
      width:20,
      // render:(text ,rowdata, rowIndex)=>rowIndex+1
    },
    {
      title:"Code",
      dataIndex:"codeValue",
      key:"code",
      sort:(a , b)=> a.codeValue - b.codeValue,
    },
    {
      title:"status",
      dataIndex:"statusResult",
      key:"statusResult",
      filters:[
        {
          text: NEW,
          value: 0,
        },
        {
          text: EXISTED,
          value: 1,
        },
        {
          text: DUPLICATE,
          value: 2
        },
      ],  
      onFilter: (value, record) => record.statusResult === value ,
      sort:(a , b)=> a.statusResult - b.statusResult,
      width:40,
      render:(text)=>renderStatusImportCode(text)
    },
    {
      title:"Action",
      dataIndex:"action",
      key:"action",
      width:30,
      render:(text , rowData ) =>{
     
        return <a className="action-new-style"  onClick={()=>handleDelete(rowData.codeId)} > {DELETE} </a>
      }
    }
  ])
}
  
  