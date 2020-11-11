import React, {useRef, useState} from "react";
import {Table, Card, Modal} from 'antd';
import Divider from "antd/es/divider";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import ButtonComponent from "@components/commons/ButtonComponent/Button.Component";
import {NotificationComponent} from "@components/commons/NotificationComponent";
import TableComponent from "@components/commons/TableComponent";
import {useTranslate} from "@shared/Hook";
import {DevicesTranslatekey} from "@shared/TranslateKey/ImportTranslateKey";
import {useApi} from "@server/apiCallAxios";
import AddNewGroupDevice from "@modules/Devices/components/ModalAddGroupDevice";
import {delDeviceFormGroup, delGroupDevice, listGroupDevice} from "@modules/Devices/service";
import PlusDeviceOfGroup from "@modules/Devices/components/ModalPlusDeviceOfGroup";


const NestedTable = (props) => {
    // const [dataTable, setDataTable] = useState([]);
    // const [pagination, setPagination] = useState(IFacePage);
    const {
        TITLE_DEL_GROUP_DEVICE,
        TITLE_CONFIRM,
        ADD_GROUP, REMOVE, TITLE_DEL_DEVICE,
        DEVICE_GROUP_NAME, REMOVE_DEVICE,
        ACTION, ACTIVE, CREATED, DEACTIVE,
        DELETE, DEVICE_NAME, DEVICE_TYPE, STATUS
    } = useTranslate(DevicesTranslatekey);
    const {execute} = useApi({useRes: true, useLoading: false});
    const [operatorModal, setOperatorModal] = useState({group: false, plus: false, dataPlus: {}});
    const tableRef = useRef(null);
    const ActionDelete = (data) => {
        Modal.confirm({
            title: TITLE_DEL_GROUP_DEVICE,
            content: `${TITLE_CONFIRM} ${data.deviceGroupName}?`,
            onOk: () => {
                execute(delGroupDevice(data.deviceGroupId)).then(res => {
                    NotificationComponent({
                        type: "success",
                        notificationProps: {message: res.message},
                    });
                    tableRef.current.handleGetListDataFunc();
                });
            }
        });

    };

    const DelDeviceOfGroup = (text, record) => {
        const raw = {
            groupDeviceId: record.deviceGroupId,
            deviceIds: [
                text.deviceId
            ]
        };

        Modal.confirm({
            title: REMOVE,
            content: `${REMOVE_DEVICE} ${text.deviceName} ${TITLE_DEL_DEVICE} ${record.deviceGroupName}`,
            onOk: () => {
                execute(delDeviceFormGroup(raw)).then(res => {
                    NotificationComponent({
                        type: "success",
                        notificationProps: {message: res.message},
                    });
                    tableRef.current.handleGetListDataFunc();
                });
            }
        });
    };

    const expandedRowRender = (record?: any) => {
        // console.log(record, "record===========")
        //createdAt: "2020-10-28T17:04:20"
        // deviceId: "d0ea7ce3-5df0-4d78-938d-49d0e7482138"
        // deviceName: "huy test 12321"
        // deviceStatusActive: null
        // deviceType: 2
        // latitude: null
        // locationId: null
        // longitude: null
        // setting: {}
        // status: -1
        const columns = [
            {title: DEVICE_NAME, dataIndex: 'deviceName', key: 'deviceName'},
            {
                title: DEVICE_TYPE,
                dataIndex: 'deviceType',
                key: 'deviceType',
                render: text => <span>{text == 1 ? "POD Hi-Pro" : text == 2 ? "POD Refresh" : "POD Vital"}</span>
            },
            {
                title: STATUS,
                dataIndex: 'status',
                key: 'status',
                render: text => <span>{text == -1 ? CREATED : text == 1 ? ACTIVE : DEACTIVE}</span>
            },
            {
                title: "",
                key: "",
                render: (text) => <span className='cursor-pointer tag-a-btn tag-a-btn-del'
                                        onClick={() => DelDeviceOfGroup(text,record)}>{DELETE}</span>

            }
        ];

        return <Table columns={columns} dataSource={record.devices} rowKey={"deviceId"}/>;
    };

    const handlePlusDevice = (data) => {
        setOperatorModal({group: false, plus: true, dataPlus: data});
    };

    const columns = [
        {title: DEVICE_GROUP_NAME, dataIndex: 'deviceGroupName', key: 'deviceGroupName'},
        {
            title: "",
            key: 'operation',
            render: (record) => <> <span className='cursor-pointer tag-a-btn tag-a-btn-normal'
                                         onClick={() => handlePlusDevice(record)}>Plus Device</span>
                <Divider type='vertical'/>
                <span className='cursor-pointer tag-a-btn tag-a-btn-del' onClick={() => ActionDelete(record)}>{DELETE}</span></>
        },
    ];

    const CloseModal = (value?: any) => {
        setOperatorModal({group: false, plus: false, dataPlus: {}});
        if (value) {
            // GetListGroupDevice(pagination);
            tableRef.current.handleGetListDataFunc();
        }
    };

    return (
        <Card>
            <div className="d-flex justify-content-end mb-4">
                <ButtonComponent
                    onClick={() =>
                        setOperatorModal({group: true, plus: false, dataPlus: {}})
                    }
                    text={ADD_GROUP}
                    iconAnt={<FontAwesomeIcon className="mr-2" icon={faPlus}/>}
                />
            </div>
            <TableComponent
                key="tableGroupDevice"
                rowKey={"deviceGroupId"}
                columns={columns}
                ref={tableRef}
                propsCustom={{
                    paramsAxiosApi: listGroupDevice,
                    paginationServer: true,
                    configUseApi: {_useDispatch: false},
                }}
                expandedRowRender={(record) => expandedRowRender(record)}
            />

            <AddNewGroupDevice visible={operatorModal.group} onClose={CloseModal}/>
            <PlusDeviceOfGroup visible={operatorModal.plus} onClose={CloseModal} data={operatorModal.dataPlus}/>
        </Card>
    );
};
export default NestedTable