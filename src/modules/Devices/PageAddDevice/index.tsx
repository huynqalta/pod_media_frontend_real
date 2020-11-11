import React, {useEffect, useState} from "react";
import {Button, Card, Col, Form, Input, Row, Select} from "antd";
import {
    createDevice, detailDevice, getAllCode, getAllGroupDevice, getAllSurvey, getAllUser, updateDevice,
} from "@modules/Devices/service";
import {NotificationComponent} from "@components/commons/NotificationComponent";
import {useRouter, useTranslate} from "@shared/Hook";
import {DevicesTranslatekey} from "@shared/TranslateKey/ImportTranslateKey";
import {useApi} from "@server/apiCallAxios";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import ButtonComponent from "@components/commons/ButtonComponent/Button.Component";

const {Option} = Select;
const queryString = require("query-string");

const PageAddDevice = (props) => {
    const {
        REQUIRE,
        DEVICE_NAME,
        SETTING,
        KEY_REQUIRED,
        KEY_DOUBLE,
        KEY,
        VALUE_REQUIRED,
        VALUE,
        ADD_SETTING,
        DEVICE_TYPE,
        SET_OF_CODE,
        SET_OF_SURVEY,
        DEVICE_GROUP_NAME,
        EDIT_DEVICE
    } = useTranslate(DevicesTranslatekey);
    const router = useRouter();
    const keyID = queryString.parse(router.history.location.search).key;

    const [form] = Form.useForm();
    const [loadingBtn, setLoading] = useState(false);
    const {execute} = useApi();
    const [dataAll, setDataAll] = useState({user: [], code: [], survey: [], groupDevice: []});
    const [detaiDevice, setDetailDevice] = useState({
        groupCodeDevices: null,
        groupDevice: null,
        latitude: null,
        locationId: null,
        longitude: null,
        deviceName: null
    });

    const validateMessages = {
        required: "${label} " + REQUIRE,
        // ...
    };

    useEffect(() => {
        GetListAllUser();
        GetDetailDevice();
        // console.log(keyID, "keyID=====");

    }, []);

    const GetDetailDevice = () => {
        if (keyID != undefined) {
            execute(detailDevice(keyID)).then((res) => {
                if (res) {
                    // console.log(res.data.setting);
                    form.setFieldsValue({
                        deviceName: res.data.deviceName,
                        deviceType: res.data.deviceType.toString(),
                        setting: Object.keys(res.data.setting).map(
                            (key) => ({key, value: res.data.setting[key]})
                        ),
                        sessionId: res.data.session.sessionId,
                        userIds: res.data.users.map(item => (item.userId)),
                        groupCodeIds: res.data.groupCodeDevices.map(item => (item.groupCodeId)),
                        groupDeviceId: res.data.groupDevice.deviceGroupId,

                    });
                    setDetailDevice({
                        deviceName: res.data.deviceName,
                        groupCodeDevices: res.data.groupCodeDevices,
                        groupDevice: res.data.groupDevice,
                        latitude: res.data.latitude,
                        locationId: res.data.locationId,
                        longitude: res.data.longitude
                    });
                }
            });
        }
    };

    const GetListAllUser = () => {
        execute(getAllUser()).then(res => {
            // console.log(res,"res====");
            //"userId": "0a61f3c7-3c21-4806-a908-fc515bddd1bc",
            //             "userName": "User01",
            //             "userEmail": "user01@gmail.com",
            setDataAll(prev => ({
                ...prev,
                user: res.map(item => ({value: item.userId, name: item.userName + ' (' + item.userEmail + ')'}))
            }))
        });
        execute(getAllCode()).then(res => {
            // console.log(res, "res====");
            setDataAll(prev => ({
                ...prev,
                code: res.map(item => ({value: item.groupCodeId, name: item.groupCodeName}))
            }));
        });
        execute(getAllSurvey()).then(res => {
            // console.log(res, "res==============")
            setDataAll(prev => ({
                ...prev,
                survey: res.map(item => ({value: item.sessionId, name: item.title}))
            }))
            //    "sessionId": "acfd3e03-f271-44da-92bf-2e76fe0327b5",
            //                 "title": "Symphony",
        });
        execute(getAllGroupDevice()).then(res => {
            // console.log(res, "res groupDevice =================")
            //groupDeviceId: "10b05f5e-7b41-4bff-b95b-3ed7d7a0537e"
            // groupDeviceName: "HuyTest"

            // deviceGroupId: "10b05f5e-7b41-4bff-b95b-3ed7d7a0537e"
            // deviceGroupName: "HuyTest"

            setDataAll(prev => ({
                ...prev,
                groupDevice: res.map(item => ({value: item.deviceGroupId, name: item.deviceGroupName}))
            }))
        });

    };

    const handleFinish = (values) => {
        // console.log(values, "value==========");
        const setting = {};
        if (values.setting) {
            values.setting.forEach((item) => (setting[item.key] = item.value));
        }
        values.setting = setting;

        setLoading(true);
        if (keyID != undefined) {
            const raw = {
                ...values,
                latitude: detaiDevice.latitude,
                longitude: detaiDevice.longitude
            };
            execute(updateDevice(keyID, raw)).then(
                (res) => {
                    if (res) {
                        setLoading(false);

                        GetDetailDevice();
                        NotificationComponent({
                            type: "success",
                            notificationProps: {message: res.message},
                        });
                    }
                },
                (err) => setLoading(false)
            );
        } else {
            const raw = {
                ...values,
                latitude: 0,
                longitude: 0,
            };
            execute(createDevice(raw)).then(
                (res) => {
                    if (res) {
                        setLoading(false);
                        form.resetFields();
                        NotificationComponent({
                            type: "success",
                            notificationProps: {message: res.message},
                        });
                    }
                },
                (err) => setLoading(false)
            );
        }

    };

    return (
        <>

            <Card>
                <section>
                    {
                        keyID &&
                        <h5> {EDIT_DEVICE} {detaiDevice && detaiDevice.deviceName}</h5>
                    }
                    <div className="mt-4"/>
                    <Form
                        onFinish={handleFinish}
                        form={form}
                        validateMessages={validateMessages}

                    >
                        {/*{...formItemLayout}*/}

                        {/*<Row>*/}
                        {/*    <Col span={10}>*/}
                        <Form.Item
                            rules={[{required: true}]}
                            label={DEVICE_NAME}
                            name="deviceName"
                            labelCol={{span: 3}}
                            wrapperCol={{span: 7, offset: 1}}
                        >
                            <Input/>
                        </Form.Item>
                        {/*</Col>*/}

                        {/*<Col span={6} offset={1}>*/}
                        <Form.Item
                            rules={[{required: true}]}
                            label={DEVICE_TYPE}
                            name="deviceType"
                            labelCol={{span: 3}}
                            wrapperCol={{span: 14, offset: 1}}
                        >
                            <Select placeholder={"Choose Type"} style={{width: 420}}>
                                <Option value="1">POD Hi-Pro</Option>
                                <Option value="2">POD Refresh</Option>
                                <Option value="3">POD Vital</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            // rules={[{required: true}]}
                            label={DEVICE_GROUP_NAME}
                            name="groupDeviceId"
                            labelCol={{span: 3}}
                            wrapperCol={{span: 14, offset: 1}}
                        >
                            <Select placeholder={"Choose group device"} style={{width: 420}}>
                                {
                                    dataAll.groupDevice.length > 0 && dataAll.groupDevice.map((item, index) => {
                                        return <Option value={item.value} key={index}>{item.name}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>


                        <Form.Item
                            // rules={[{required: true}]}
                            label={SET_OF_SURVEY}
                            name="sessionId"
                            labelCol={{span: 3}}
                            wrapperCol={{span: 14, offset: 1}}
                        >
                            <Select placeholder={"Choose set of survey"} style={{width: 420}} showSearch>
                                {
                                    dataAll.survey.length > 0 && dataAll.survey.map((item, index) => {
                                        return <Option value={item.value} key={index}>{item.name}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item
                            // rules={[{required: true}]}
                            label={"User share"}
                            name="userIds"
                            labelCol={{span: 3}}
                            wrapperCol={{span: 14, offset: 1}}
                        >
                            <Select placeholder={"Choose user share"}
                                    style={{width: 420, maxHeight: "7rem", overflowY: "scroll"}} mode="tags">
                                {
                                    dataAll.user.length > 0 && dataAll.user.map((item, index) => {
                                        return <Option value={item.value} key={index}>{item.name}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item
                            // rules={[{required: true}]}

                            label={SET_OF_CODE}
                            name="groupCodeIds"
                            labelCol={{span: 3}}
                            wrapperCol={{span: 14, offset: 1}}
                        >
                            <Select placeholder={"Choose set of code"}
                                    style={{width: 420, maxHeight: "4rem", overflowY: "scroll"}} showSearch mode="tags"
                                    className={"select-code"}>
                                {
                                    dataAll.code.length > 0 && dataAll.code.map((item, index) => {
                                        return <Option value={item.value} key={index}>{item.name}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                        {/*    </Col>*/}
                        {/*</Row>*/}

                        <Form.List name="setting">
                            {(fields, {add, remove}) => {
                                return (
                                    <>
                                        <div>
                                            {/* {/*{...(index === 0 ? "" : formItemLayout2)}*/}
                                            {fields.map((field, index) => (

                                                <Row>
                                                    <Col span={9} offset={1}>
                                                        <Form.Item
                                                            key={field.key}
                                                            labelCol={{span: 4}}
                                                            wrapperCol={{offset: 4}}
                                                            label={SETTING}
                                                            name={[field.name, "key"]}
                                                            fieldKey={[field.fieldKey, "key"]}
                                                            rules={[
                                                                {required: true, message: KEY_REQUIRED},
                                                                ({getFieldValue}) => ({
                                                                    validator(rule, value) {
                                                                        const total = getFieldValue("setting")
                                                                            .filter((x) => x != undefined)
                                                                            .filter((y) => y.key == value).length;
                                                                        if (value && total > 1) {
                                                                            return Promise.reject(KEY_DOUBLE);
                                                                        }
                                                                        return Promise.resolve();
                                                                    },
                                                                }),
                                                            ]}
                                                            // style={{width: "50%"}}
                                                        >
                                                            <Input placeholder={KEY} width={"100%"}/>
                                                        </Form.Item>
                                                    </Col>
                                                    <Col span={10} offset={1}>
                                                        <Form.Item
                                                            {...field}
                                                            // wrapperCol={{span: 8, offset: 1}}
                                                            name={[field.name, "value"]}
                                                            fieldKey={[field.fieldKey, "value"]}
                                                            rules={[{required: true, message: VALUE_REQUIRED}]}
                                                            // style={{width: "45%"}}  {...formItemLayout2}
                                                        >
                                                            <Input placeholder={VALUE}/>
                                                        </Form.Item>
                                                    </Col>

                                                    <Col span={1} offset={1}>

                                                        <MinusCircleOutlined
                                                            onClick={() => {
                                                                remove(field.name);
                                                            }}
                                                        />
                                                    </Col>
                                                </Row>
                                            ))}


                                        </div>
                                        <Form.Item className="text-center">
                                            <Button
                                                style={{width: "30em"}}
                                                type="dashed"
                                                onClick={() => {
                                                    add();
                                                }}
                                                block
                                            >
                                                <PlusOutlined/> {ADD_SETTING}
                                            </Button>
                                        </Form.Item>
                                    </>
                                );
                            }}
                        </Form.List>
                        <Form.Item className="float-right">
                            <ButtonComponent text={"Submit"} type={"submit"}
                                             disabled={loadingBtn}
                                             loading={loadingBtn}/>
                            {/*<Button type="primary" htmlType="submit" disabled={loadingBtn}>*/}
                            {/*    Submit*/}
                            {/*</Button>*/}
                        </Form.Item>
                    </Form>
                </section>
            </Card>
        </>
    );
};

export default PageAddDevice;
