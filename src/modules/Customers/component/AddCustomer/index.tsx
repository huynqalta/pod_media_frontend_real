import React, {useEffect, useState} from "react";
import {Modal, Form, Input} from 'antd';
import Select from "antd/es/select";
import UploadMediaComponent from "@components/commons/UploadMediaComponent/UploadMediaComponent";
import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";
import {useApi} from "@server/apiCallAxios";
import {editCustomer, newCustomer} from "@modules/Customers/service";
import NotificationComponent from "@components/commons/NotificationComponent";
import {useTranslate} from "@shared/Hook";
import {CustomersTranslateKey} from "@shared/TranslateKey/ImportTranslateKey";

const ModalAddCustomer = props => {
    const {dataEdit} = props;
    const {visible, closeModal} = props;
    const [form] = Form.useForm();
    const [imageUrl, setImageUrl] = useState({url: '', file: ''});
    const {execute} = useApi({showSuccess: true});
    const {REQUIRE, FULL_NAME, AGE, SEX, PHONE, ADDRESS, MALE, FEMALE, OTHER, AVATAR} = useTranslate(CustomersTranslateKey);

    const validateMessages = {
        required: "${label} " + REQUIRE
    };

    useEffect(() => {
        // console.log(dataEdit, "dataEdit======")
        dataEdit && form.setFieldsValue({
            CustomerCode: dataEdit.customerCode,
            CustomerName: dataEdit.customerName,
            CustomerAge: dataEdit.customerAge,
            CustomerGender: dataEdit.customerGender,
            CustomerPhone: dataEdit.customerPhone,
            CustomerAddress: dataEdit.customerAddress,
        });
    }, [dataEdit]);

    const handleCancel = () => {
        closeModal(false);
        form.resetFields();
        setImageUrl({url: '', file: ''});
    };

    const handleOk = () => {
        form.submit();
    };

    const onFinish = (value) => {
        if (!dataEdit) {

            const frmData = new FormData();
            frmData.append("CustomerCode", value.CustomerCode);
            frmData.append("CustomerName", value.CustomerName);
            frmData.append("CustomerAge", value.CustomerAge);
            frmData.append("CustomerGender", value.CustomerGender);
            frmData.append("CustomerAddress", value.CustomerAddress);
            frmData.append("CustomerPhone", value.CustomerPhone);

            frmData.append("CustomerImage", imageUrl.file);

            // console.log(value, "valuee======");

            execute(newCustomer(frmData)).then(res => {
                closeModal(false);
                form.resetFields();
                setImageUrl({url: '', file: ''});
                NotificationComponent({type: "success", notificationProps: {message: res.message}});

            })
        } else {
            const raw = {
                CustomerCode: value.CustomerCode,
                CustomerName: value.CustomerName,
                CustomerAge: +value.CustomerAge,
                CustomerGender: value.CustomerGender,
                CustomerAddress: value.CustomerAddress,
                CustomerPhone: value.CustomerPhone,
            };

            execute(editCustomer(dataEdit.customerID, raw)).then(res => {
                closeModal(false);
                // form.resetFields();
                setImageUrl({url: '', file: ''});
                NotificationComponent({type: "success", notificationProps: {message: res.message}});
            }).catch(error => {
                closeModal(true);
            })

        }
    };


    return (
        <>
            <Modal
                title={dataEdit ? `Edit customer - ${dataEdit.customerName}` : "Add new customer"}
                visible={visible}
                onCancel={handleCancel}
                onOk={handleOk}
                // footer={null}
                width={800}
                maskClosable={false}
            >
                <Form form={form} onFinish={onFinish} className="form-basic" layout="vertical"
                      validateMessages={validateMessages}>
                    <Form.Item label={'Code'} name="CustomerCode"
                               rules={[{required: true}]}>
                        <Input autoComplete="off"/>
                    </Form.Item>
                    <Row gutter={24}>
                        {
                            dataEdit == null ?
                                <Col span={8}>
                                    <Form.Item label={AVATAR} rules={[{required: true}]} name={""}>
                                        <div className="w-100">
                                            <UploadMediaComponent media={imageUrl.url} height={"15rem"}

                                                                  onChange={(media) => setImageUrl({
                                                                      url: media,
                                                                      file: media
                                                                  })}/>
                                        </div>
                                    </Form.Item>
                                </Col>
                                : ""
                        }
                        <Col span={dataEdit == null ? 16 : 24}>
                            <Form.Item label={FULL_NAME} name="CustomerName"
                                       rules={[{required: true}]}>
                                <Input autoComplete="off"/>
                            </Form.Item>
                            <Form.Item label={AGE} name="CustomerAge" rules={[{required: true}]}>
                                <Input type="number" autoComplete="off"/>
                            </Form.Item>
                            <Form.Item label={SEX} name="CustomerGender">
                                <Select>
                                    <Select.Option value={0}>{MALE}</Select.Option>
                                    <Select.Option value={1}>{FEMALE}</Select.Option>
                                    <Select.Option value={2}>{OTHER}</Select.Option>
                                </Select>
                            </Form.Item>

                        </Col>
                    </Row>
                    <Form.Item label={PHONE} name="CustomerPhone"
                               rules={[{required: true}]}>
                        <Input autoComplete="off"/>
                    </Form.Item>

                    <Form.Item label={ADDRESS} name="CustomerAddress"
                               rules={[{required: true}]}>
                        <Input autoComplete="off"/>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
};

export default ModalAddCustomer