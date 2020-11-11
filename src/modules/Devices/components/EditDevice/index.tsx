import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useState } from "react";
import { Button, Form, Input, InputNumber, notification, Space } from "antd";
import { useApi } from "@server/apiCallAxios";
import { createDevice, updateDevice } from "@modules/Devices/service";
import "./styles.scss";
import ButtonComponent from "@components/commons/ButtonComponent/Button.Component";
import { NotificationComponent } from "@components/commons/NotificationComponent";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

interface Props {
  visible?: boolean;
  onCancel?: () => void;
  tableRef?: any;
  data?: any;
  translate?: any;
  language?: string;
}

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 24 },
};
const formItemLayout1 = {
  labelCol: { span: 11 },
  wrapperCol: { span: 24 },
};
const formItemLayout2 = {
  wrapperCol: { span: 20, offset: 11 },
};
const AddDevice = (props: Props) => {
  const [form] = Form.useForm();
  const [Loading, setLoading] = useState(false);
  const { execute } = useApi();
  const {
    ADD_DEVICE,
    DEVICE_NAME,
    LATITUDE,
    LONGITUDE,
    CANCEL,
    REQUIRE,
    EDIT_DEVICE,
    SETTING,
    KEY,
    VALUE,
    KEY_REQUIRED,
    VALUE_REQUIRED,
    KEY_DOUBLE,
    ADD_SETTING,
  } = props.translate;
  const validateMessages = {
    required: "${label} " + REQUIRE,
    // ...
  };

  useEffect(() => {
    if (props.data) {
      console.log(props.data);
      form.setFieldsValue(props.data);
      if (props.data.setting) {
        const dataSetting = Object.keys(props.data.setting).map((item) => ({
          key: item,
          value: props.data.setting[item],
        }));
        form.setFieldsValue({ setting: dataSetting });
      }
    }
  }, [props.data]);
  const handleCancel = () => {
    props.onCancel();
    form.resetFields();
  };

  const handleSubmit = () => {
    form.submit();
  };
  const handleFinish = (values) => {
    const setting = {};
    if (values.setting) {
      values.setting.forEach((item) => (setting[item.key] = item.value));
    }
    values.setting = setting;
    setLoading(true);
    if (!props.data) {
      execute(createDevice(values)).then(
        (res) => {
          if (res) {
            setLoading(false);
            if (props.tableRef) {
              props.tableRef.current.handleGetListDataFunc();
            }
            NotificationComponent({
              type: "success",
              notificationProps: { message: res.message },
            });
            handleCancel();
          }
        },
        (err) => setLoading(false)
      );
    } else {
      execute(updateDevice(values, props.data.deviceId)).then(
        (res) => {
          if (res) {
            setLoading(false);
            if (props.tableRef) {
              props.tableRef.current.handleGetListDataFunc();
            }
            NotificationComponent({
              type: "success",
              notificationProps: { message: res.message },
            });
            handleCancel();
          }
        },
        (err) => {
          console.log(err);
          setLoading(false);
          NotificationComponent({
            type: "error",
            notificationProps: { message: err.message },
          });
        }
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
      <Form
        onFinish={handleFinish}
        {...formItemLayout}
        form={form}
        validateMessages={validateMessages}
      >
        <Form.Item
          rules={[{ required: true }]}
          label={DEVICE_NAME}
          name="deviceName"
        >
          <Input />
        </Form.Item>
        <Form.List name="setting">
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((field, index) => (
                  <div className="d-flex justify-content-between">
                    <Form.Item
                      key={field.key}
                      {...(index === 0 ? formItemLayout1 : formItemLayout2)}
                      label={index === 0 ? SETTING : ""}
                      name={[field.name, "key"]}
                      fieldKey={[field.fieldKey, "key"]}
                      rules={[
                        { required: true, message: KEY_REQUIRED },
                        ({ getFieldValue }) => ({
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
                      style={{ width: "55%" }}
                    >
                      <Input placeholder={KEY} width={"100%"} />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, "value"]}
                      fieldKey={[field.fieldKey, "value"]}
                      rules={[{ required: true, message: VALUE_REQUIRED }]}
                      style={{ width: "40%" }}
                    >
                      <Input placeholder={VALUE} />
                    </Form.Item>

                    <MinusCircleOutlined
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  </div>
                ))}

                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => {
                      add();
                    }}
                    block
                  >
                    <PlusOutlined /> {ADD_SETTING}
                  </Button>
                </Form.Item>
              </div>
            );
          }}
        </Form.List>
      </Form>
    </Modal>
  );
};

export default AddDevice;
