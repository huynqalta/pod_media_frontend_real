import React, {useEffect, useState} from "react";
import {notification, Select} from "antd";
import Modal from "antd/lib/modal/Modal";
import {useApi} from "@server/apiCallAxios";
import {paramsListUser} from "@modules/User/service";
import useUser from "@modules/User/hook/useUser";
import {assignSession} from "@modules/Survey/pages/Session/service";

const {Option} = Select;

const ModalAssignSession = props => {
    const {execute} = useApi();
    const {visible, onCancel, data, tableRef, translate} = props;
    const [listUser, setListUser] = useState([]);
    const [chooseUser, setChooseUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const {LABEL_CHOOSE_USER, TITLE_MODAL_ASSIGN} = translate;

    useEffect(() => {
        // console.log(data, 'data=====')
        if (visible)
            return getListFullUser();
    }, [visible]);

    const getListFullUser = () => {
        execute(paramsListUser()).then(res => {
            // console.log(res, "ress===========")
            //userId: "0a61f3c7-3c21-4806-a908-fc515bddd1bc"
            // userName: "User01"
            setListUser(res.map((item) => ({value: item.userId, name: item.userName})));
            setChooseUser(null)
        })
    };

    const handleCancel = () => {
        onCancel();
        setChooseUser(null);
    };

    const handleSubmit = () => {
        setLoading(true);
        const raw = {
            sessionId: data.sessionId,
            userId: chooseUser
        };

        execute(assignSession(raw)).then(res => {
            notification.success({message: res.message});
            tableRef.current.handleGetListDataFunc();
            setLoading(false);
            onCancel();
        }).catch(err => {
            setLoading(false);
        })
    };


    return (
        <>
            <Modal
                className={"modal-add-device"}
                visible={visible}
                maskClosable={false}
                title={TITLE_MODAL_ASSIGN}
                // confirmLoading={Loading}
                onCancel={handleCancel}
                onOk={handleSubmit}
                confirmLoading={loading}
            >
                <section className="text-center">


                    <div>
                        <label>{LABEL_CHOOSE_USER}</label>
                    </div>
                    <Select placeholder={"Choose user assign"}
                            style={{width: 220}}
                            showSearch
                            onChange={e => setChooseUser(e)}
                            value={chooseUser}
                    >
                        {listUser.length > 0 && listUser.map(item => {
                            return <Option value={item.value}>{item.name}</Option>
                        })}
                    </Select>
                </section>
            </Modal>

        </>
    )
};

export default ModalAssignSession