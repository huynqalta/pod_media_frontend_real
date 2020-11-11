import ButtonComponent from '@components/commons/ButtonComponent/Button.Component'

import { getColumns } from './tableConfig'
import {  Card } from 'antd'
import React, { Suspense, useEffect, useRef, useState } from 'react'
import queryString from "query-string"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import TableComponent_New from '@components/commons/TableComponent_New'
import { paramsGetList, paramsUpDateStatus } from './service'
import { useLocation, useParams } from 'react-router'
import { useApi } from '@server/apiCallAxios'
import { notification } from 'antd/es'
import useBreadcrumb  from '@components/commons/PageHeader/hook/useBreadcrumb'
import {Breadcrumb} from "@reducer/BreadcrumbReducer"
import { useDispatch } from 'react-redux'

interface Props {
  useTranslate: any
  language: any
}


const ModalImportCode = React.lazy(() => import('../ModalImportCode'));

const ListCode = (props: Props) => {
  const { useTranslate, language } = props
  const {IMPORT_CODE ,DELETE , UPDATE_STATUS_SUCCESS} =  useTranslate;
  const tableRef = useRef(null)
  const {routers , status} =  useBreadcrumb()
  const dispatch = useDispatch()
  const [openModal , setOpenModal] = useState({isShow:false , data:null });
  const {id}:any = useParams();
  const location = useLocation();
  const name = queryString.parse(location.search).Campaign
  const isOwner = queryString.parse(location.search).userType === null
  
  const {execute} = useApi()
 
  useEffect(()=>{
    //replace breadcrumb
    
    
    if(routers.length > 0 && status == "success" && name){
        const firstPath = location.pathname.split("/")[1]
      const routersReplace =  JSON.parse(JSON.stringify(routers))
      const lastRouter = routersReplace[routersReplace.length - 1]
    if("/"+firstPath === lastRouter.path){
        routersReplace[routersReplace.length - 1].breadcrumbName = name
            dispatch(Breadcrumb({
                routers:routersReplace ,
                 status:"modified"
            }))
    }
   }
},[routers , location])
  

  const handleOnCancel = (isReload) =>{
    
    if(!!isReload) { tableRef.current.handleGetListDataFunc()}
    setOpenModal(prev => ({data:null , isShow:false}))
  }
  const onChangeStatus = (codeDeviceId) =>{
    if(isOwner){
      execute(paramsUpDateStatus(codeDeviceId)).then((res)=>{
        if(res.data){
          tableRef.current.handleGetListDataFunc().then((res)=>{
            notification.success({
              message:UPDATE_STATUS_SUCCESS,
              
            })
          });
         
        }
      })
    }
   
  }
  const columns = getColumns( {onChangeStatus , isOwner}, useTranslate)
  return (
    <div className="list-devices">
      <Card>
        <div className="d-flex justify-content-end mb-4">
            <ButtonComponent
              disabled={!isOwner}
              onClick={() =>
                setOpenModal((prev) => ({ ...prev, isShow: true, data:{groupCodeName:name , groupCodeId:id} }))
              }
              text={IMPORT_CODE}
              iconAnt={<FontAwesomeIcon className="mr-2" icon={faPlus} />}
            />
          </div>
        <div className="d-flex justify-content-between">
          <TableComponent_New
            ref={tableRef}
            key="listCodeByGroup"
            rowKey={"codeValue"}
            columns={columns}
            propsCustom={{
              showSTTCollumn:true,
              paramsAxiosApi: paramsGetList,
              paginationServer: true,
              params:{groupCodeId:id}
            }}
          />

        </div>
      {
        // openModal.isShow && 
      <Suspense fallback={<div>Loading...</div>}>
        <ModalImportCode visible={openModal.isShow} data={openModal.data} onCancel={handleOnCancel} />
      </Suspense>
      }
      </Card>
        
    </div>
  )
}

export default ListCode