import React, {useEffect, useState} from "react";
import {Modal, Select} from "antd";
import {useApi} from "@server/apiCallAxios";
import {getDevices, plusDeviceGroup} from "@modules/Devices/service";
import {NotificationComponent} from "@components/commons/NotificationComponent";

const { Option } = Select;

const PlusDeviceOfGroup = (props) => {
    const {visible, data, onClose} = props;
    const {execute} = useApi();
    const [listDevice, setListDevice] = useState([]);
    const [listSelect, setListSelect] = useState([]);

    useEffect(()=>{
        if(visible) return GetAllDevice();
    },[visible]);

    const GetAllDevice = () => {
        execute(getDevices({"limit": 0})).then(res=>{
            // console.log(res.data,"res==========")
            if(res) return setListDevice(res.data.map(item=>({value: item.deviceId, name: item.deviceName})))
        //    deviceId: "9f9dbd0b-eb57-43af-840a-20e70477651e"
            // deviceName: "123123"
        })
    };

    const onCancelModal = () => {
        onClose();
        setListSelect([]);
    };

    const OnOkeModal = () => {
        const raw = {deviceIds:listSelect};
        execute(plusDeviceGroup(data.deviceGroupId, raw)).then(res=>{
            if(res){
                NotificationComponent({
                    type: "success",
                    notificationProps: { message: res.message },
                });
                onClose(true);
                setListSelect([]);
            }
        });
    };

    const handleChangeSelect = e => {
        // console.log(e,"eee=======");
        setListSelect(e);
    };

    return(
        <>
            <Modal visible={visible} title={`Plus device for ${data && data.deviceGroupName}`}
                   onCancel={onCancelModal} onOk={OnOkeModal}>
                <Select placeholder={"Choose device"} style={{ width: 450 }}
                        onChange={handleChangeSelect} mode="tags" value={listSelect}>
                    {
                        listDevice.length > 0 && listDevice.map(item=>(

                            <Option value={item.value}>{item.name}</Option>
                        ))
                    }
                </Select>
            </Modal>
        </>
    )
};

export default PlusDeviceOfGroup