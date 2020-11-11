import React, { ReactNode, useRef } from "react";
import "./style.scss";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

interface IProps {
    onClick?: (event) => void;
    classNames?: string;
    icon?: string;
    text?: string | ReactNode;
    disabled?: boolean;
    type?: any;
    refs?: any;
    style?: any;
    iconAnt?: any;
    loading?: boolean;
    changeColor?: boolean;
    htmlType?:any;
}

const ButtonComponent = (props: IProps) => {
    const myRef = useRef();
    return (
        <button
            style={props.style}
            className={`btn align-items-center mx-2 justify-content-center button-component ${props.classNames} ${props.changeColor && "button-component-blue"}`}
            type={props.type ? props.type : "button"}
            // type="button"
            ref={props.refs || myRef}
            onClick={(event) => (props.onClick ? props.onClick(event) : undefined)}
            disabled={props.disabled}

        >
            {props.loading && <Spin size="small" indicator={antIcon} className="text-white mr-2" />}
            {props.icon && <i className={`icon  ${props.icon}`} />}
            {props.iconAnt && props.iconAnt} {props.text || "Click"}
        </button>
    );
};

function areEqual(prevProps, nextProps) {
    /* Trả về true nếu nextProps bằng prevProps, ngược lại trả về false */
    if (prevProps.disabled != nextProps.disabled || prevProps.iconAnt != nextProps.iconAnt || prevProps.text != nextProps.text) {
        return false;
    }
    return true;
}

export default ButtonComponent;

// fas fa-filter
