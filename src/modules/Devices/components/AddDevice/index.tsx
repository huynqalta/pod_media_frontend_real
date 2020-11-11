import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, notification } from "antd";
import { useApi } from "@server/apiCallAxios";
import { createDevice, updateDevice } from "@modules/Devices/service";
import "./styles.scss";
import ButtonComponent from "@components/commons/ButtonComponent/Button.Component";
import { NotificationComponent } from "@components/commons/NotificationComponent";

interface Props {
  visible: boolean;
  onCancel: () => void;
  tableRef: any;
  data: any;
  translate: any;
}

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};
const AddDevice = (props: Props) => {
  const [form] = Form.useForm();
  const [Loading, setLoading] = useState(false);
  const { execute } = useApi();
  const { ADD_DEVICE, DEVICE_NAME, LATITUDE, LONGITUDE, CANCEL, REQUIRE, EDIT_DEVICE } = props.translate;
  const validateMessages = {
    required: "${label} " + REQUIRE,
    // ...
  };

  useEffect(() => {
    if (props.data) {
      form.setFieldsValue(props.data);
    }
  }, [props.data]);
  const handleCancel = () => {
    props.onCancel();
    form.resetFields();
  };

  const handleSubmit = () => {
    form.submit();
  };
  const handleFinish = values => {
    setLoading(true);
    if (!props.data) {
      execute(createDevice(values)).then(
        res => {
          if (res) {
            setLoading(false);
            if (props.tableRef) {
              props.tableRef.current.handleGetListDataFunc();
            }
            notification.success({ message: res.message });
            handleCancel();
          }
        },
        err => setLoading(false)
      );
    } else {
      execute(updateDevice(values, props.data.deviceId)).then(
        res => {
          if (res) {
            setLoading(false);
            if (props.tableRef) {
              props.tableRef.current.handleGetListDataFunc();
            }
            NotificationComponent({ type: "success", notificationProps: { message: res.message } });
            handleCancel();
          }
        },
        err => setLoading(false)
      );
    }
  };

  return (
    <Modal
      className={"modal-add-device"}
      visible={props.visible}
      maskClosable={false}
      okText={!props.data ? ADD_DEVICE : EDIT_DEVICE}
      cancelText={CANCEL}
      confirmLoading={Loading}
      title={!props.data ? ADD_DEVICE : EDIT_DEVICE}
      onCancel={handleCancel}
      onOk={handleSubmit}
      // footer={
      //   <div>
      //     <ButtonComponent text={CANCEL} onClick={handleCancel} />
      //     <ButtonComponent text={!props.data ? ADD_DEVICE : EDIT_DEVICE} onClick={handleSubmit} />
      //   </div>
      // }
    >
      <Form onFinish={handleFinish} {...formItemLayout} form={form} validateMessages={validateMessages}>
        <Form.Item rules={[{ required: true }]} label={DEVICE_NAME} name="deviceName">
          <Input />
        </Form.Item>
        <Form.Item rules={[{ required: true }]} label={LATITUDE} name="latitude">
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>{" "}
        <Form.Item rules={[{ required: true }]} label={LONGITUDE} name="longitude">
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddDevice;
