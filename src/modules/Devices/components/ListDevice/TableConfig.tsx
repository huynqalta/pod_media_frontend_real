import React, {useState} from "react";
import {CloseOutlined, EditOutlined, SaveOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import {Button, Checkbox, Divider, Popconfirm} from "antd";
import {ColumnsType} from "antd/lib/table";
import {DEVICE_DETAIL, EDIT_ADD} from "@modules/router-paths";
import InputName from "./InputName";
import {useRouter} from "@shared/Hook";

export const getColumns = (
    {onDelete, onChange, onSubmit, showCode, onUpdate},
    translatekey
): ColumnsType => {
    const {
        ACTIVE,
        DEACTIVE,
        VIEW_DETAIL,
        UPDATE,
        DELETE,
        DEVICE_NAME,
        LATITUDE,
        LONGITUDE,
        STATUS,
        UPDATED_AT,
        ACTION,
        SHOW_CODE,
        CREATED
    } = translatekey;

    const router = useRouter();

    const [activeId, setActiveId] = useState(null);

    // const onSubmit = (value) => {
    //   console.log(value);
    // };

    return [
        {
            title: "STT",
            dataIndex: "stt",
            key: "stt",
            width: 50,
        },
        {
            title: DEVICE_NAME,
            dataIndex: "deviceName",
            key: "deviceName",
            width: 270,
            render: (text, rowData: any) => {
                return (
                    <InputName
                        record={rowData}
                        data={text}
                        onSubmit={onSubmit}
                        active={activeId == rowData?.deviceId}
                        setActivedId={setActiveId}
                    />
                );
            },
        },
        {
            title: STATUS,
            dataIndex: "status",
            key: "status",
            width: 230,
            render: (text, record) => {
                if (text !== -1) {
                    return (
                        <Checkbox name={record + ""} checked={!!text} onChange={onChange}>
                            {text ? ACTIVE : DEACTIVE}
                        </Checkbox>
                    );
                } else {
                    return CREATED;
                }
            },
        },
        {
            title: "",
            dataIndex: "",
            key: "action",
            width: 600,
            render: (text, rowData: any) => (
                <div className="row flex-wrap">
                    {rowData.status === -1 && (
                        <>

                            <a
                                className={" tag-a-btn tag-a-btn-normal"}
                                onClick={() => {
                                    showCode(rowData);
                                }}
                            >
                                {SHOW_CODE}
                            </a>
                            <Divider type={"vertical"}/>
                        </>
                    )}
                    <Link
                        className={" tag-a-btn tag-a-btn-normal"}
                        to={`${DEVICE_DETAIL}/${rowData["deviceId"]}`}
                    >
                        {VIEW_DETAIL}
                    </Link>
                    <Divider type={"vertical"}/>
                    <a
                        className={" tag-a-btn tag-a-btn-normal"}
                        onClick={() =>
                            router.push({
                                pathname: EDIT_ADD,
                                search: `?key=${rowData["deviceId"]}`,
                            })
                        }
                    >
                        {UPDATE}
                    </a>
                    <Divider type={"vertical"}/>
                    <a className={"tag-a-btn tag-a-btn-del"} onClick={() => onDelete(rowData)}>
                        {DELETE}
                    </a>
                </div>
            ),
        },
    ];
};
