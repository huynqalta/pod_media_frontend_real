import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useState } from "react";
import { Button, Form, Input, InputNumber, notification, Select } from "antd";
import { useApi } from "@server/apiCallAxios";
import { createQuestionSession } from "@modules/Survey/pages/SurveyQuestion/service";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { TYPE_QUESTION, TYPE_ANSWER } from "@helper/variable";
import { getAllQuestion } from "../../service";
// import "./styles.scss";

interface Props {
  visible: boolean;
  onCancel: () => void;
  onSuccess: () => void;
  tableRef: any;
  data: any;
  translate: any;
  id: string;
  language: string;
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 21 },
    sm: { span: 19 },
  },
};
const ModalSurveyQuestion = (props: Props) => {
  const [form] = Form.useForm();
  const [Loading, setLoading] = useState(false);
  const [listAllQuestion, setListAllQuestion] = useState([]);
  const { execute } = useApi();
  const {
    ADD_QUESTION_SESSION,
    ADD,
    QUESTION,
    EDIT_QUESTION,
    CHOOSE_QUESTION,
    CANCEL,
    REQUIRE,
  } = props.translate;
  const validateMessages = {
    required: "${label} " + REQUIRE,
    // ...
  };

  useEffect(() => {
    const body = {
      page: 0,
      limit: 10,
      search: "",
    };
    execute(getAllQuestion(body)).then((res) => {
      setListAllQuestion(res);
    });
  }, []);
  const handleCancel = () => {
    props.onCancel();
    form.resetFields();
  };

  const handleSubmit = () => {
    form.submit();
  };
  const handleFinish = (values) => {
    const dataConvert = {
      insertMulti: values.question.map((item, index) => ({
        sessionId: props.id,
        questionId: item,
        numberSelected: 1,
        order: index,
      })),
    };
    execute(createQuestionSession(dataConvert)).then(
      (res) => {
        if (res) {
          setLoading(false);
          notification.success({ message: res.message });
          props.onSuccess();
          handleCancel();
        }
      },
      (err) => setLoading(false)
    );
  };
  return (
    <Modal
      title={props.data ? EDIT_QUESTION : ADD_QUESTION_SESSION}
      // className={"modal-question"}
      visible={props.visible}
      maskClosable={false}
      okText={props.data ? EDIT_QUESTION : ADD}
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
          label={QUESTION}
          name="question"
        >
          <Select mode="multiple" placeholder={CHOOSE_QUESTION}>
            {listAllQuestion.map((item, index) => (
              <Select.Option value={item.questionId} key={index}>
                {item.content}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default React.memo(ModalSurveyQuestion);
