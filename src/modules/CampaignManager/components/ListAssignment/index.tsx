
import TableComponent from '@components/commons/TableComponent'
import { getColumns } from './tableConfig'
import {  Select , Modal} from 'antd'
import React, { forwardRef, Suspense, useEffect, useImperativeHandle, useRef, useState } from 'react'

import useListAssignment from '@modules/CampaignManager/hook/useListAssignment'
import { DataStatus } from '@helper/variable'
import { useDispatch } from 'react-redux'
import { getUserAssignment, removeUser } from '@reducer/ListUserAssigment'
import { useParams } from 'react-router'
import { paramDeleteShareGroupCode, paramShowAllShareGroupCode } from './service'
import TableComponent_New from '@components/commons/TableComponent_New'
import { useApi } from '@server/apiCallAxios'



interface Props {
  useTranslate: any
  language: any,
  listAllUser:Array<any>
  ref:any
}




const ListAssignment = forwardRef((props: Props , ref) => {
  const { useTranslate, listAllUser } = props
  const {CONFIRM_DELETE_USER , TITLE_DELETE_USER , EXISTING_GROUP_CODE} =  useTranslate
  const tableRef =  useRef(null)
  const {execute}  = useApi()
  const dispatch = useDispatch()
  
  const {id}:any = useParams()


  let options = [];
  const handleDataTable = () => {

  }
  useImperativeHandle(
    ref,
    () => ({
      handleReloadTable:()=>tableRef.current.handleGetListDataFunc()
    })
  )
  const onDelete = (rowData) => {
 
    Modal.confirm({
      title: CONFIRM_DELETE_USER,
      content: `${TITLE_DELETE_USER} ${rowData.userName} ?`,
      onOk: () =>  handleDeleteUser(rowData)
    });
   
  }
  const handleDeleteUser = (rowData) => {
    execute(paramDeleteShareGroupCode(rowData.shareGroupCodeId)).then((res)=>{
      if(res.data){
        // dispatch(removeUser(rowData.userId))
        tableRef.current.handleGetListDataFunc()
      }
    })
  }

  
  const columns = getColumns( {onDelete} ,  {...useTranslate})
  return (
    <div className="list-devices">
     
      <div className="d-flex flex-column mb-4">
     {EXISTING_GROUP_CODE} 
     </div>
        <div className="d-flex justify-content-between">
        
          <TableComponent_New
            changeComponent={handleDataTable}
            ref={tableRef}
            key="tableAssginment"
            rowKey={"userId"}
            columns={columns}
            propsCustom={{
              showSTTCollumn:true,
              params:{groupCodeId:id},
              paramsAxiosApi: paramShowAllShareGroupCode,
              paginationServer: false,
              configUseApi:{_useDispatch:true}
             
            }}
          />
        </div>
  
    </div>
  )
})

export default ListAssignment