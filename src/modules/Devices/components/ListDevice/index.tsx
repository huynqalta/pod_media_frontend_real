import TableComponent from "@components/commons/TableComponent";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    deleteDevices,
    getDevices,
    updateDevice,
} from "@modules/Devices/service";
import {Card, Modal} from "antd";
import React, {Suspense, useCallback, useRef, useState} from "react";
import {getColumns} from "./tableConfig";
import {useApi} from "@server/apiCallAxios";

import ButtonComponent from "@components/commons/ButtonComponent/Button.Component";
import {NotificationComponent} from "@components/commons/NotificationComponent";
import MapComponent from "@components/commons/Map";
import FormActiveCode from "./FormActiveCode";
import AddDevice from "@modules/Devices/components/EditDevice";
import {useRouter} from "@shared/Hook";
import {DEVICES_ADD} from "@modules/router-paths";
import "./styles.scss";

interface Props {
    useTranslate: any;
    language: string;
}

const ListDevice = (props: Props) => {
    const {ADD_DEVICE, CONFIRM_DELETE, TITLE_DELETE} = props.useTranslate;

    const [operatorModal, setOperatorModal] = useState({
        visible: false,
        data: null,
    });
    const [dataMap, setDataMap] = useState<Array<any>>([]);
    const [inforActiveCode, setInforActiveCode] = useState(null);
    const [displayForm, setDisplayForm] = useState(false);
    const router = useRouter();
    const {execute} = useApi({useRes: true});
    const tableRef = useRef(null);
    const handleDelete = (deviceId) => {
        execute(deleteDevices(deviceId)).then((res) => {
            if (res) {
                NotificationComponent({
                    type: "success",
                    notificationProps: {message: res.message},
                });
                tableRef.current.handleGetListDataFunc();
            }
        });
    };
    const onDelete = ({deviceId, deviceName}) => {
        Modal.confirm({
            title: TITLE_DELETE,
            content: `${CONFIRM_DELETE} ${deviceName} ?`,
            onOk: () => handleDelete(deviceId),
        });
    };
    const onChange = (values) => {
        const datas = values.target.name;
        const id = datas.deviceId;
        const deviceName = datas.deviceName;
        const latitude = datas.latitude;
        const longtitude = datas.longitude;
        let status = 0;
        values.target.checked ? (status = 1) : (status = 0);
        const body: any = {deviceName, latitude, longtitude, status};
        execute(updateDevice(body, id)).then((res) => {
            if (res) {
                NotificationComponent({
                    type: "success",
                    notificationProps: {message: res.message},
                });
                tableRef.current.handleGetListDataFunc();
            }
        });
    };

    const onSubmit = useCallback((values, record) => {
        const id = record.deviceId;
        const deviceName = values;
        const latitude = record.latitude;
        const longtitude = record.longitude;
        // let status = record.status;
        const setting = {};
        const body: any = {deviceName, latitude, longtitude, setting};
        execute(updateDevice(body, id)).then((res) => {
            if (res) {
                NotificationComponent({
                    type: "success",
                    notificationProps: {message: res.message},
                });
                tableRef.current.handleGetListDataFunc();
            }
        });
    }, []);

    const onUpdate = (data) => {
        setOperatorModal({visible: true, data: data});
    };

    const closeForm = () => {
        setDisplayForm(false);
    };

    const showCode = (deviceInfo) => {
        setInforActiveCode(deviceInfo);
        setDisplayForm(true);
    };

    const columns = getColumns(
        {onDelete, onChange, onSubmit, showCode, onUpdate},
        props.useTranslate
    );

    const handleDataTable = (data) => {
        if (data) {
            const dataConvertMap = data.data.map((item) => ({
                lat: item.latitude || "",
                lng: item.longitude,
                place: item.deviceName,
            }));
            setDataMap(dataConvertMap);
        }
    };

    return (
        <div className="list-devices">
            <Card>
                <div className="d-flex justify-content-end mb-4">
                    <ButtonComponent
                        onClick={
                            () => router.push(DEVICES_ADD)
                            // setOperatorModal((prev) => ({ ...prev, visible: true }))
                        }
                        text={ADD_DEVICE}
                        iconAnt={<FontAwesomeIcon className="mr-2" icon={faPlus}/>}
                    />
                </div>
                <div className="d-flex justify-content-between">
                    <TableComponent
                        changeComponent={handleDataTable}
                        ref={tableRef}
                        key="tableDevice"
                        rowKey={"deviceId"}
                        columns={columns}
                        propsCustom={{
                            paramsAxiosApi: getDevices,
                            paginationServer: true,
                            configUseApi: {_useDispatch: false},
                        }}
                    />
                    <div style={{width: "500px", height: "500px", marginLeft: "15px"}}>
                        <MapComponent position={dataMap}/>
                    </div>
                </div>
                <AddDevice
                    visible={operatorModal.visible}
                    data={operatorModal.data}
                    translate={props.useTranslate}
                    onCancel={() => setOperatorModal({data: null, visible: false})}
                    tableRef={tableRef}
                    language={props.language}
                />
            </Card>
            {inforActiveCode && (
                <Suspense fallback={<div></div>}>
                    <FormActiveCode
                        closeForm={closeForm}
                        displayForm={displayForm}
                        data={inforActiveCode}
                    />
                </Suspense>
            )}
        </div>
    );
};

export default ListDevice;
