import React, { useEffect, useRef, useState } from "react";
import ButtonComponent from "@components/commons/ButtonComponent/Button.Component";
import { importCode } from "@modules/CampaignManager/service";
import { useApi } from "@server/apiCallAxios";
import { useTranslate } from "@shared/Hook";
import { CampaignTranslateKey, CommonTranslateKey } from "@shared/TranslateKey/ImportTranslateKey";
import { Button, Table, Tag } from "antd";
import { notification } from "antd/es";
import { getColumns } from "@modules/CampaignManager/components/ModalImportCode/tableConfig";
import Modal from "antd/lib/modal/Modal";
import NotificationComponent from "@components/commons/NotificationComponent";
import ImportCodeComponent from "../ImportCodeComponent";


import "./styles.scss";

const imgUpload = require("@assets/images/upload-clound-a0824c90.png");



const ModalImportFile = props => {
  
  const {execute , loading} =  useApi({useLoading:true})
  const [listCode, setListCode] = useState([]);
  const {DELETE , IMPORT_CODE , CANCEL , SELECTED,IMPORT_CODE_FAIL , DES_IMPORT_FAIL} = useTranslate({...CampaignTranslateKey,...CommonTranslateKey})
  const [listSelected , setListSelected] = useState([])

  const handleCancel = (isReload=false)=>{
    props.onCancel(isReload)
   setTimeout(()=>{
    listCode.length > 0 &&  setListCode([])
    listSelected.length > 0 && setListSelected([])
   },1000)
  }
  const handleAfterImport = (values) =>{
    setListCode(values.data);
    setListSelected([])
  
  }
  // rowSelection objects indicates the need for row selection
const rowSelection = {
  selectedRowKeys:listSelected,
  onChange: (selectedRowKeys, selectedRows) => {
    setListSelected(selectedRowKeys)
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
  
};

  const handleSubmitCode = (values) =>{
  
    execute(importCode({"GroupCodeId": props?.data?.groupCodeId,Codes:listCode})).then((res)=>{
      if(res.data){
        const checkImportFail = res.data.some(item => item.statusResult != 0)
        if(checkImportFail){
         
          notification.error({
            message:IMPORT_CODE_FAIL,
            description:DES_IMPORT_FAIL
          })

          setListCode(res.data);
        }else{
          NotificationComponent({
            type:"success",
            notificationProps:{
              message:res.message
            }
          })
         
          handleCancel(true);
        }
      }
    },err=>{
      console.log(err.responsive)
    })
  }
 
  const handleDelete = (codeId) =>{
    const index = listSelected.findIndex(i => i ===  codeId);
    
    if(index !=  -1 ) {
      const newList = listSelected.splice(index, 1)
      setListSelected(newList)
    }
    const newListCode = listCode.filter(item => codeId != item.codeId)
    setListCode(newListCode)
  }



  const columns = getColumns({handleDelete} , useTranslate(CampaignTranslateKey))
  const handleSelectedMultiple = ()=>{
 
    const newListCode = listCode.filter(item => listSelected.indexOf(item.codeId) == -1 )
    setListCode(newListCode)
    setListSelected([])
  }
  
  return (
    <>
      <Modal
      width={750}
     
      footer={
        [
          <ButtonComponent disabled={loading} text={CANCEL} classNames={"btn-component-cancel"} onClick={()=>handleCancel(false)}/>,
          <ButtonComponent text={IMPORT_CODE} loading={loading} disabled={listCode.length == 0 || loading} onClick={handleSubmitCode}/>,
        ]
      }
      title={<h3>
        {IMPORT_CODE + " " + props?.data?.groupCodeName}
      </h3>}
      maskClosable={false} onCancel={()=>handleCancel(false)} visible={props.visible} >
   
      <div className="tab-import">
        <div className="m-auto upload-file text-center">
        {
            listCode.length == 0 &&
            
             <label  className="d-block img-upload">
              <img src={imgUpload} className=" mb-4 mx-auto" />
            </label>
          }
        <ImportCodeComponent onFinish={handleAfterImport}/>
          {listCode.length > 0 && 
          
         <div className="table-responsive mt-2 w-100 mx-2">
             <div style={{ marginBottom: 16 , float:"left" }}>
          <Button className={`action-new-style`}  onClick={handleSelectedMultiple} disabled={listSelected.length == 0}>{DELETE}</Button>
            <span style={{ marginLeft: 8 }}>
              {listSelected.length != 0 ? `${SELECTED} ${listSelected.length} Item` : ''}
            </span>
        </div>
            <Table
              rowSelection={rowSelection}
              rowKey={"codeId"}
              dataSource={listCode || []}
              columns={columns}
            />
         </div>
          }
         
        </div>
      </div>
      </Modal>
    </>
  );
};

export default ModalImportFile;
