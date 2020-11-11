import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, notification } from "antd";
import { useApi } from "@server/apiCallAxios";
import {
  createSession,
  updateSession,
} from "@modules/Survey/pages/Session/service";
// import "./styles.scss";

interface Props {
  visible: boolean;
  onCancel: () => void;
  tableRef: any;
  data: any;
  translate: any;
}

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 20 },
};
const ModalSession = (props: Props) => {
  const [form] = Form.useForm();
  const [Loading, setLoading] = useState(false);
  const { execute } = useApi();
  const {
    ADD_SESSION,
    NAME_SESSION,
    TITLE_SESSION,
    EDIT_SESSION,
    DESCRIPTION_SESSION,
    REQUIRE,
    CANCEL,
  } = props.translate;
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
  const handleFinish = (values) => {
    setLoading(true);
    if (!props.data) {
      execute(createSession(values)).then(
        (res) => {
          if (res) {
            setLoading(false);
            if (props.tableRef) {
              props.tableRef.current.handleGetListDataFunc();
            }
            notification.success({ message: res.message });
            handleCancel();
          }
        },
        (err) => setLoading(false)
      );
    } else {
      execute(updateSession(values, props.data.sessionId)).then(
        (res) => {
          if (res) {
            setLoading(false);
            if (props.tableRef) {
              props.tableRef.current.handleGetListDataFunc();
            }
            notification.success({ message: res.message });
            handleCancel();
          }
        },
        (err) => setLoading(false)
      );
    }
  };

  return (
    <Modal
      className={"modal-add-device"}
      visible={props.visible}
      maskClosable={false}
      title={props.data ? EDIT_SESSION : ADD_SESSION}
      okText={props.data ? EDIT_SESSION : ADD_SESSION}
      cancelText={CANCEL}
      confirmLoading={Loading}
      onCancel={handleCancel}
      onOk={handleSubmit}
    >
      <Form
        onFinish={handleFinish}
        {...formItemLayout}
        form={form}
        validateMessages={validateMessages}
      >
        <Form.Item
          rules={[{ required: true }]}
          label={TITLE_SESSION}
          name="title"
        >
          <Input />
        </Form.Item>{" "}
        <Form.Item
          rules={[{ required: true }]}
          label={DESCRIPTION_SESSION}
          name="description"
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default React.memo(ModalSession);
