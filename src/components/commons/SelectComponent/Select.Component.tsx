import React, { useState, useContext } from 'react';
import { Select, Tooltip } from 'antd';
import './styles.scss';
// import {useTranslation} from "react-i18next";

const { Option } = Select;

interface IProps {
    name?: string;
    data?: Array<any>;
    dataDisable?: Array<any>;
    value?: any;
    placeholder?: string;
    onChange?: (value: any) => void;
    fieldName?: string;
    fieldValue?: string;
    className?: string;
    mode?: any; // default , multiple
    dataSelected?: any;
    disable?: boolean;
    loading?: boolean;
    exFilterStatus?: Array<any>;
    valueOptionAll?: string;
    titleOptionAll?: string;
    isShowOptionAll?: boolean;
    showSearch?: boolean;
    allowClear?: boolean;
}

const SelectComponent = (props: IProps) => {

    const [strSearch, setStrSearch] = useState<string>('');

    return (
        <Select
            className={`w-100 custom-select-ant ${props.className || ''}`}
            allowClear={props.allowClear || false}
            mode={props.mode || 'default'}
            key={props.name}
            showSearch={props.showSearch}
            value={props.value ? props.value : undefined}
            placeholder={props.placeholder || ''}
            loading={props.loading || false}
            autoClearSearchValue={false}
            onChange={(value, event) => {
                props.onChange({ [props.name]: value });
            }}
            onSearch={(value) => {
                // support local search
                setStrSearch(value);
            }}
            filterOption={false}
            disabled={props.disable || false}
        >
            {props.isShowOptionAll && (
                <Option key={`option-all`} title={'All'} value={props.valueOptionAll}>
                    {' '}
                    {props.titleOptionAll || 'All'}{' '}
                </Option>
            )}
            {props.data.map((data, index) => {
                if (
                    strSearch.toUpperCase() == '' ||
                    data[props.fieldName].toUpperCase().includes(strSearch)
                ) {
                    return (
                        <Option
                            key={`${props.name}_${index}`}
                            disabled={
                                props.dataDisable &&
                                props.dataDisable.indexOf(data[props.fieldValue] + '') != -1
                            }
                            title={
                                props.exFilterStatus &&
                                    props.exFilterStatus.indexOf(data[props.fieldValue]) >= 0
                                    ? 'not-go'
                                    : ''
                            }
                            value={`${data[props.fieldValue]}`}
                        >
                            {' '}
                            <Tooltip title={data[props.fieldName]}>
                                <span> {data[props.fieldName]}{' '}</span>
                            </Tooltip>
                        </Option>
                    );
                }
            })}
        </Select>
    );
};

function areEqual(prevProps, nextProps) {
    /* Trả về true nếu nextProps bằng prevProps, ngược lại trả về false */
    if (
        prevProps.titleOptionAll != nextProps.titleOptionAll ||
        prevProps.data != nextProps.data ||
        prevProps.value != nextProps.value ||
        prevProps.dataDisable != nextProps.dataDisable
    ) {
        return false;
    }
    return true;
}

export default React.memo(SelectComponent, areEqual);
