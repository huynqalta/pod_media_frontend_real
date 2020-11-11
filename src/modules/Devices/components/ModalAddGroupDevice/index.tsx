import React, {useState} from "react";
import { Modal} from "antd";
import InputComponent from "@components/commons/InputComponent/Input.Component";
import {useApi} from "@server/apiCallAxios";
import {createGroupDevice} from "@modules/Devices/service";
import {NotificationComponent} from "@components/commons/NotificationComponent";

const AddNewGroupDevice = (props) => {
    const {visible, onClose} = props;
    const [dataNewGroup, setDataNewGroup] = useState({groupDeviceName: ""});
    const onCancelModal = () => {
        onClose();
        setDataNewGroup({groupDeviceName: ""});
    };
    const { execute } = useApi();

    const OnChangeInput = e => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        setDataNewGroup(prev=>({...prev, [name]: value}));
        // console.log(value,'value=============')
    };

    const OnOkeModal = () => {
        execute(createGroupDevice(dataNewGroup)).then(res=>{
            if(res){
                setDataNewGroup({groupDeviceName: ""});
                // console.log(res,"ress==========");
                onClose(true);
                NotificationComponent({
                    type: "success",
                    notificationProps: { message: res.message },
                });
            }
        })
    };

    return(
        <>
            <Modal visible={visible} title={"Add new group device"}
                   onCancel={onCancelModal} onOk={OnOkeModal}>
                <InputComponent label={"Group device name"} onChange={OnChangeInput}
                                name={"groupDeviceName"} value={dataNewGroup.groupDeviceName}/>
            </Modal>
        </>
    )
};

export default AddNewGroupDevice