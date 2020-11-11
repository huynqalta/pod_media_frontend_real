import React from "react";
import {Divider} from "antd";
import {ColumnsType} from "antd/lib/table";
import {Link} from "react-router-dom";

export const getColumnsSession = (
    {onDelete, onUpdate, onAssign},
    translatekey
): ColumnsType => {
    const {
        NAME_SESSION,
        TITLE_SESSION,
        DESCRIPTION_SESSION,
        ACTION,
        LIST_QUESTION,
        UPDATE,
        DELETE,
        ASSIGN,
    } = translatekey;
    return [
        {
            title: TITLE_SESSION,
            dataIndex: "title",
            key: "title",
            // width: 200,
        },
        {
            title: DESCRIPTION_SESSION,
            dataIndex: "description",
            key: "description",
            // width: 300,
        },
        {
            title: "",
            dataIndex: "",
            key: "action",
            width: 500,
            render: (rowData) => (
                <>

                    <a className={" tag-a-btn tag-a-btn-normal"} onClick={() => onAssign(rowData)}>
                        {ASSIGN}
                    </a>
                    <Divider type={"vertical"}/>
                    <Link
                        to={`/session/question/${rowData.sessionId}`}
                        className={" tag-a-btn tag-a-btn-normal"}
                    >
                        {LIST_QUESTION}
                    </Link>
                    <Divider type={"vertical"}/>
                    <a className={" tag-a-btn tag-a-btn-normal"} onClick={() => onUpdate(rowData)}>
                        {UPDATE}
                    </a>
                    <Divider type={"vertical"}/>
                    <a className={" tag-a-btn tag-a-btn-del"} onClick={() => onDelete(rowData)}>
                        {DELETE}
                    </a>
                </>
            ),
        },
    ];
};
