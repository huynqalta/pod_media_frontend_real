import React, { Suspense, useContext, useEffect, useRef, useState } from 'react'
import { useHistory, useLocation, useParams } from 'react-router'
import {useDispatch} from "react-redux"
import {  Button, Card, Input, Select, Table, Tooltip } from 'antd'
import {  EditOutlined, SaveOutlined } from '@ant-design/icons'
import Form, { useForm } from "antd/lib/form/Form";
import FormItem from "antd/lib/form/FormItem";
import { notification } from 'antd/es'
import Tag from 'antd/lib/tag'

import queryString from "query-string"

import ListAssignment from '../components/ListAssignment'
import ImportCodeComponent from "../components/ImportCodeComponent";
import ButtonComponent from '@components/commons/ButtonComponent/Button.Component'

import { useTranslate } from '@shared/Hook'
import useUser from '@modules/User/hook/useUser'
import useListAssignment from '../hook/useListAssignment'
import useBreadcrumb from '@components/commons/PageHeader/hook/useBreadcrumb'

import { LanguageContext } from '@shared/Context/Language'
import { CampaignTranslateKey, CommonTranslateKey, UserTranslateKey } from '@shared/TranslateKey/ImportTranslateKey'

import { DataStatus } from '@helper/variable'
import { useApi } from '@server/apiCallAxios'
import {Breadcrumb} from "@reducer/BreadcrumbReducer"
import {getAllUser} from "@reducer/userReducer"

import { paramsPaginationUser } from '@modules/User/service'
import { createGroupCode, paramsAsignForGroup, updateGroupCode } from './service'

import { RequestCreateCampaignCode } from './interface'
import { CAMPAIGN_MANAGER } from '@modules/router-paths'
import { UserContext } from '@shared/Context/User'
import {Modal} from 'antd'

import { getColumns } from '../components/ModalImportCode/tableConfig'
import { assignListUser, getUserAssignment } from '@reducer/ListUserAssigment'
import NotificationComponent from '@components/commons/NotificationComponent'
import { type } from 'os'


interface Props {
    
}
const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
    
  };
  const {Option} = Select
  const initFileImport =  {
    data:[],fileName:"",allowImport:true, visibleModal:false
  }

const CampaignCode = (props: Props) => {
 
    const tableRef =  useRef(null)
    const [form] = useForm()
    const {id}:any = useParams()
    const history = useHistory()
    const location = useLocation()
    const dispatch = useDispatch()
    const {ASSIGN_PERSON,TITLE_MODAL_REVIEW,CAMPAIGN_NAME,CAMPAIGN_NAME_REQUIRED, ASSIGNMENT,IMPORT_CODE , CAMPAIGN_CREATE_CODE_SET, CAMPAIGN_UPDATE_CODE_SET , ASSIGN,DES_IMPORT_FAIL} = useTranslate(CampaignTranslateKey)
    const {CREATE, PLEASE_SELECT , EDIT , SAVE , CANCEL} = useTranslate(CommonTranslateKey)
    const name = queryString.parse(location.search).Campaign

    const {routers , status} =  useBreadcrumb()
    const {status:statusUser , listAllUser} = useUser()
    const {listUserAssign  } = useListAssignment()
    const {execute , loading} = useApi({useLoading:true})
    const {execute:executeAssign , loading:loadingAssign} = useApi({useLoading:true})

    const [FilesImport, setFilesImport] = useState({
        data:[],
        fileName:"",
        allowImport:true, // 1 : allow import , 0:
        visibleModal:false
    })
    const  [isEdit, setIsEdit] = useState(false)
    const { language } = useContext(LanguageContext);
    const { userInfo } = useContext(UserContext);
    console.log(userInfo.UserId)
   useEffect(() => {
    if(name){
        form.setFieldsValue({
            groupCodeName:name
        })
    }
    if(!id){
        dispatch(getUserAssignment({data:[]}))
    }
    form.setFieldsValue({
        "listAssign":[]
    })
    }, [])
    useEffect(()=>{
        if(statusUser == DataStatus.modified || statusUser == DataStatus.init  ){
        const body = { page: 0, limit: 10, search: '' };
        execute(paramsPaginationUser(body)).then((res) => {
            dispatch(getAllUser(res.data.data));
        });
        }
    },[statusUser])

    useEffect(()=>{
        //replace breadcrumb
        if(routers.length > 0 && status == "success" && name){
            const firstPath = location.pathname.split("/")[1]
          const routersReplace =  JSON.parse(JSON.stringify(routers))
          const lastRouter = routersReplace[routersReplace.length - 1]
        if("/"+firstPath === lastRouter.path){
            routersReplace[routersReplace.length - 1].breadcrumbName = name
            console.log(routersReplace , "routersReplace")
                dispatch(Breadcrumb({
                    routers:routersReplace ,
                     status:"modified"
                }))
        }
       }
    },[routers , location])

    const handleAfterImport = (values)=>{
        setFilesImport(prev => ({...prev,...values,visibleModal:true}))
      }
    const handleSubmit = ()=>{
        form.submit();
      }
      
    
    const handleChangeSelect = (value, option) =>{
       form.setFieldsValue({
        listAssign:value
       })
    }
    const handleFinish = (values)=>{
            if(id){
                handleUpdate(values)
            }else{
                handleCreate(values)
            }
        }
    const handleUpdate = (values) =>{
        execute(updateGroupCode(values.groupCodeName , id)).then((res)=>{
            if(res){
                setIsEdit(false)
                NotificationComponent({
                    type: "success",
                    notificationProps: { message: res.message },
                  });
                // notification.success({
                //     message:"Update Campaign Name success!!!",
                //     description:res.data.message
                // })
            }
        })
    }
 
    const handleDelete = (codeId) =>{
       const listCode = [...FilesImport.data]
        // const index = listSelected.findIndex(i => i ===  codeId);
        // console.log(listSelected , index , codeId , "delete")
        // if(index !=  -1 ) {
        //     const newList = listSelected.splice(index, 1)
        //     setListSelected(newList)
        // }
        const newListCode = listCode.filter(item => codeId != item.codeId)
      setFilesImport(prev => ({...prev,data:newListCode}))  
    }
    
    const columns = getColumns({handleDelete} , useTranslate(CampaignTranslateKey))

    const handleCreate = (values) =>{
            const Request:RequestCreateCampaignCode = {
                createShareGroupCodeRequest:{
                    userId:form.getFieldValue("listAssign")
                },
                groupCodeName:form.getFieldValue("groupCodeName"),
                importCodeRequest:{
                    Codes:FilesImport.data || []
                }
            }
        
            execute(createGroupCode(Request)).then((res)=>{
                if(res.data){
                    const checkImportFail = res.data?.itemCodes?.some(item => item.statusResult != 0)
                    
                    if(checkImportFail){
                        NotificationComponent({
                            type: "success",
                            notificationProps: { message: res.message  , description:DES_IMPORT_FAIL},
                          });
                      
                        setFilesImport(prev => ({...prev , data: res.data?.itemCodes , allowImport:!checkImportFail , visibleModal:true}))
                     }else{
                        NotificationComponent({
                            type: "success",
                            notificationProps: { message: res.message },
                          });
                      
                        history.push(CAMPAIGN_MANAGER)
                     }
                  
                }
            }, err => notification.error({
                message:"Created Fail!",
                description:err.response?.data?.message
            }))
        }

    const handleAssignTable = () =>{
            // const listAssign =  listAllUser.filter((item)=>{
            //     const index = form.getFieldValue("listAssign").findIndex(i=> i  == item.userId)
            //     return index != -1
            // })

            executeAssign(paramsAsignForGroup(form.getFieldValue("listAssign") , id)).then((res)=>{
                if(res.data){
                    form.setFieldsValue({
                        listAssign:[]
                    })
                    // NotificationComponent({type:"success" , notificationProps:{message:ASSIGN_PERSON}})
                    NotificationComponent({
                        type: "success",
                        notificationProps: { message: res.message },
                      });
                    tableRef.current.handleReloadTable()
                    // dispatch(assignListUser(listAssign))
                }
            
            })
        
        }

    const renderButton = (id, isEdit)=>{
            
            if(id && isEdit){
                return <Tooltip placement="topLeft"  title={SAVE}>
                        <SaveOutlined onClick={()=>handleSubmit()} />
                    </Tooltip>
            }
            if(id && !isEdit){
                return <Tooltip placement="topLeft"  title={EDIT}>
                <EditOutlined onClick={()=>setIsEdit(true)} />
            </Tooltip>
            } 
            if(!id){
                return undefined
            }
        }
        const handleOkModal= ()=>{
            const checkImportFail = FilesImport.data.some(item => item.statusResult != 0)
            setFilesImport(prev=>({...prev,  visibleModal:false, allowImport:!checkImportFail}))
        }
    return (
        <Card title={!id ?  CAMPAIGN_CREATE_CODE_SET : CAMPAIGN_UPDATE_CODE_SET + " " + name}>
            
                <Form labelAlign="left"  
                onFinish={handleFinish} {...layout}
                 form={form} 
                >
                <FormItem label={CAMPAIGN_NAME} name="groupCodeName"  rules={[{ required: true  , message:CAMPAIGN_NAME_REQUIRED}]}>
                    <Input disabled={id && !isEdit} placeholder={CAMPAIGN_NAME}
                     addonAfter={ renderButton(id , isEdit)}/>
                </FormItem>
               {
                   !id &&
                    <FormItem label={IMPORT_CODE}>
                    <ImportCodeComponent text={IMPORT_CODE} onFinish={handleAfterImport}/>
                    <div className={"d-flex mt-3"}>
                       
                        {FilesImport?.fileName &&
                         <Tag color={FilesImport.allowImport ? "green" : "error"} className="mr-2" closable
                              style={{verticalAlign:"0.125em"}}  
                              onClick={()=>setFilesImport(prev =>({...prev , visibleModal:true}))}
                              onClose={()=>setFilesImport(initFileImport)}>
                              {FilesImport.fileName}
                        </Tag>}
                    </div>
                    </FormItem>
               }
                
                {/* {id && <div className="text-right my-2"><ButtonComponent onClick={handleSubmit} text={UPDATE} /></div>} */}
                <FormItem   label={ASSIGNMENT} shouldUpdate={(prevValues, curValues) => prevValues.listAssign !== curValues.listAssign} >
                {    ({ getFieldValue }) => {
                    
                    return  ( <div className="d-flex flex-column mb-4">
                                <Select
                                    mode="multiple"
                                    style={{ width: '100%' }}
                                    placeholder={PLEASE_SELECT}
                                    optionLabelProp="label"
                                    value={getFieldValue("listAssign") || []}
                                    onChange={handleChangeSelect}
                                    
                                    >
                                    {listAllUser?.map(item =>
                                        {
                                            const index = listUserAssign.findIndex(i => i.userId == item.userId )
                                            const isYou = userInfo.UserId === item.userId
                                            return  index == -1 && !isYou && (<Option label={item.userName} value={item.userId}><div className="d-flex flex-column">
                                            <span>{item.userName}</span>
                                            <small style={{color:"gray" , textTransform:"initial"}}>{item.userEmail}</small>
                                            </div></Option>)
                                        }
                                        )}
                                    </Select>
                                    {id && <div className="my-3"> <Button loading={loadingAssign} onClick={handleAssignTable} disabled={!getFieldValue("listAssign") || getFieldValue("listAssign")?.length == 0}  type="primary">{ASSIGN}</Button></div>}
                    </div>)}
                }
                </FormItem>
                {!id && <div className="text-right my-2"><ButtonComponent loading={loading} onClick={handleSubmit} text={CREATE} /></div>}
               {
                   id &&  <ListAssignment
                   listAllUser={listAllUser}
                   ref={tableRef}
                   key={"listAssign"}
                   useTranslate={{...useTranslate(CampaignTranslateKey),...useTranslate(CommonTranslateKey),...useTranslate(UserTranslateKey)}}
                   language={language}
               />
               }
                     
                </Form>
                <Suspense fallback={<div>Loading...</div>}>
                   <Modal
                        width={750}
                   maskClosable={false}
                   onCancel={()=>setFilesImport(prev=>({...prev,  visibleModal:false}))}
                   onOk={handleOkModal}
                   cancelText={CANCEL}
                   visible={FilesImport.visibleModal}
                   title={TITLE_MODAL_REVIEW}>
                            <Table
                                rowKey={"codeId"}
                                dataSource={FilesImport.data}
                                columns={columns}
                                
                            />,
                   </Modal>
                </Suspense>
        </Card>
        
    
    )
}

export default CampaignCode
