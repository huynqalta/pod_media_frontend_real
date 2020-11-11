import React, { Suspense, useEffect, useRef, useState } from 'react'
import { Card } from 'antd'
import { Modal } from 'antd/es'
import { useHistory } from 'react-router'

import ButtonComponent from '@components/commons/ButtonComponent/Button.Component'
import { getRenderItem} from './tableConfig'
import { paramsGetListGroupCode, paramsRemoveListGroupCode } from "@modules/CampaignManager/service"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import { CAMPAIGN_CREATE } from '@modules/router-paths'
import ListComponent from '@components/commons/ListComponent'

import { useApi } from '@server/apiCallAxios'
import NotificationComponent from '@components/commons/NotificationComponent'

interface Props {
  useTranslate: any
  language: any
}
type KeyModal = "import" |  "add" | ""
interface OpenModal {
  visible:boolean,
  data:any
  key:KeyModal
}

const ModalImportCode = React.lazy(() => import('../ModalImportCode'));

const ListGroupCode = (props: Props) => {
  const { useTranslate, language } = props
  const history = useHistory()

  const {TITLE_DELETE , CONFIRM_DELETE ,ADD_CAMPAIGN} = useTranslate
  const tableRef = useRef(null)
  const [openModal , setOpenModal] = useState<OpenModal>({visible:false , data:null , key:""});
  const {execute , loading:loadingDelete}  = useApi()
  const handleDelete = (groupCodeId) => {
    execute(paramsRemoveListGroupCode(groupCodeId)).then((res)=>{
      if(res.data){
        tableRef.current.handleGetListDataFunc()
        NotificationComponent({type:"success",notificationProps:{message:res.message}})
      }
    })
  }
  const onDelete = ({groupCodeId , groupCodeName}) => {
    Modal.confirm({
      title: TITLE_DELETE,
      content: `${CONFIRM_DELETE} ${groupCodeName} ?`,
      onOk: () => handleDelete(groupCodeId),
    });
  }
  const importCode = (rowData) => {
    setOpenModal(prev => ({...prev , visible:true , key:"import",data:rowData}))
  }
  const handleOnCancel = (isReload) =>{
    console.log(isReload , ":isReloadisReload")
    if(!!isReload) {
      tableRef.current.handleGetListDataFunc()
    }
    setOpenModal(prev => ({data:null , visible:false , key:""}))
}
  
  useEffect(() => {
    console.log(tableRef)
  }, [tableRef])
  return (
    <div className="list-devices">
      <Card>
        <div className="d-flex justify-content-end ">
            <ButtonComponent
              onClick={() =>
                // setOpenModal((prev) => ({ ...prev, visible: true ,key:"add"}))
                history.push(CAMPAIGN_CREATE)
              }
              text={ADD_CAMPAIGN}
              iconAnt={<FontAwesomeIcon className="mr-2" icon={faPlus} />}
            />
          </div>
        <div className="d-flex justify-content-between">
          <ListComponent
            ref={tableRef}
            key="listDevice"
            propscustom={{
              renderItem: (item, index)=> getRenderItem({importCode ,onDelete} , useTranslate ,item, index  ),
              paramsAxiosApi: paramsGetListGroupCode,
              paginationServer: true,
              
            }}
          />

        </div>
    
      <Suspense fallback={<div>Loading...</div>} key="modalImport">
        <ModalImportCode useTranslate={useTranslate} visible={openModal.visible && openModal.key == "import"} data={openModal.data} onCancel={(isReload)=>handleOnCancel(isReload)} />
      </Suspense>
      
   
      </Card>
        
    </div>
  )
}

export default ListGroupCode