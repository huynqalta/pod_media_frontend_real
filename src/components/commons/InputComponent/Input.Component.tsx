import React, {useRef} from "react";
import "./styles.scss";

interface IProps {
    onChange?: (event) => void;
    name?: string;
    value?: any;
    id?: string;
    type?: string;
    placeholder?: string;
    classNames?: string;
    onBlur?: (event) => void;
    onFocus?: (event) => void;
    onKeyDown?: (event) => void;
    min?: any;
    max?: any;
    notAutoComplete?: boolean;
    refs?: any;
    disabled?: boolean;
    style?: any;
    error?: {
        status: boolean;
        message: string;
    };
    pattern?: any;
    maxLength?: number;
    noLabel?: any;
    label?: any;
    require?: any;
}

const InputComponent = (props: IProps) => {

    const myRef = useRef();
    return (
        <React.Fragment>
            <div className={" wrap-input-component"}>
                {props.label && (
                    <label className={`labelInput ${props.noLabel && "d-none"}`}>
                        {props.label} {props.require ? <span style={{color: "red"}}>*</span> : ""}
                    </label>
                )}
                <div className="position-relative">
                    <input
                        type={props.type}
                        name={props.name}
                        ref={props.refs || myRef}
                        key={"inputComponent"}
                        onKeyDown={props.onKeyDown}
                        onChange={props.onChange}
                        onBlur={props.onBlur}
                        onFocus={props.onFocus}
                        checked={props.value}
                        value={props.value}
                        min={props.min}
                        max={props.max}
                        style={props.style}
                        disabled={props.disabled}
                        autoComplete={props.notAutoComplete ? "on" : "off"}
                        className={`form-control custom-input ${props.classNames} ${props.error && props.error.status && "error"}`}
                        id={props.id || ""}
                        placeholder={props.placeholder}
                        pattern={props.pattern}
                        maxLength={props.maxLength}
                    />
                    {<div className={`box-border-bottom ${props.error && props.error.status && "error"}`}/>}
                </div>
                {props.error && props.error.status && (
                    <div style={{height: 0}}
                         className={`text-left m-0 message-require ${props.error && props.error.status && "error"}`}>
                        {(props.error && props.error.status && props.error.message) || "Field is require!"}
                    </div>
                )}
            </div>
        </React.Fragment>
    );
};
export default React.memo(InputComponent);
