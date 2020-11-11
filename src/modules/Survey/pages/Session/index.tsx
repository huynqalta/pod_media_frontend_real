import React, {useEffect, useRef, useState} from "react";
import {notification} from "antd";
import Card from "antd/es/card";
import ButtonComponent from "@components/commons/ButtonComponent/Button.Component";
import {PlusOutlined} from "@ant-design/icons";
import {useApi} from "@server/apiCallAxios";
import Modal from "antd/es/modal";
import TableComponent from "@components/commons/TableComponent";
import {getSession, deleteSession} from "./service";
import {getColumnsSession} from "./columns";
import ModalSession from "./components/ModalSession";
import {useTranslate} from "@shared/Hook";
import {SurveyTranslateKey} from "@shared/TranslateKey/ImportTranslateKey";
import useMemoSelector from "@components/commons/useMemoSelector";
import ModalAssignSession from "@modules/Survey/pages/Session/components/ModalAssign";
import TableComponent_New from "@components/commons/TableComponent_New";

const Session = (props) => {
    const tranSlateKey = useTranslate(SurveyTranslateKey);
    const {ADD, DELETE_SESSION, CONFIRM_DELETE_SESSION} = tranSlateKey;
    const [showModal, setShowModal] = useState({modal: false, data: null, modalAssign: false});
    const tableRef = useRef(null);
    const {execute} = useApi({useRes: true});


    const handleDelete = (sessionId) => {
        execute(deleteSession(sessionId)).then((res) => {
            if (res) {
                notification.success({message: res.message});
                tableRef.current.handleGetListDataFunc();
            }
        });
    };

    const onDelete = ({sessionId, name}) => {
        Modal.confirm({
            title: DELETE_SESSION,
            content: `${CONFIRM_DELETE_SESSION} ${name} ?`,
            onOk: () => handleDelete(sessionId),
        });
    };
    const onUpdate = (rowData) => {
        setShowModal({
            modal: true,
            data: rowData,
            modalAssign: false
        });
    };

    const onAssign = (rowData) =>{

        setShowModal({
            modal: false,
            data: rowData,
            modalAssign: true
        });
    };

    const columns = getColumnsSession({onDelete, onUpdate, onAssign}, tranSlateKey);

    const handleOpenModal = () => {
        setShowModal({modal: true, data: null, modalAssign: false});
    };

    return (
        <>
            <Card>
                <div className="d-flex justify-content-end mb-4">
                    <ButtonComponent
                        text={ADD}
                        iconAnt={<PlusOutlined/>}
                        onClick={handleOpenModal}
                    />
                </div>
                {/* <TableComponent
                    ref={tableRef}
                    key="tableDevice"
                    rowKey={"sessionId"}
                    title={() => (
                        <></>
                        //   <div className="d-flex justify-content-end">
                        //     <ButtonComponent
                        //       onClick={() => setOperatorModal(prev => ({ ...prev, visible: true }))}
                        //       text={ADD_DEVICE}
                        //       iconAnt={<FontAwesomeIcon className="mr-2" icon={faPlus} />}
                        //     />
                        //   </div>
                    )}
                    columns={columns}
                    propsCustom={{
                        paramsAxiosApi: getSession,
                        paginationServer: true,
                    }}
                /> */}
                 <TableComponent_New
                    ref={tableRef}
                    key="tableDevice"
                    rowKey={"sessionId"}
                    columns={columns}
                    propsCustom={{
                        showSTTCollumn:true,
                        paramsAxiosApi: getSession,
                        paginationServer: true,
                    }}
                />
                <ModalSession
                    visible={showModal.modal}
                    data={showModal.data}
                    translate={tranSlateKey}
                    onCancel={() => setShowModal({data: null, modal: false, modalAssign: false})}
                    tableRef={tableRef}
                />

                <ModalAssignSession
                    translate={tranSlateKey}
                    visible={showModal.modalAssign}
                    onCancel={() => setShowModal({data: null, modal: false, modalAssign: false})}
                    tableRef={tableRef}
                    data={showModal.data}
                />
            </Card>
        </>
    );
};

export default React.memo(Session);
