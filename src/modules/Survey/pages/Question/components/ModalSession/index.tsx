import Modal from "antd/lib/modal/Modal";
import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Input, InputNumber, notification, Select } from "antd";
import { useApi } from "@server/apiCallAxios";
import {
  createQuestion,
  updateQuestion,
} from "@modules/Survey/pages/Question/service";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { TYPE_QUESTION, TYPE_ANSWER } from "@helper/variable";
import { LanguageContext } from "@shared/Context/Language";
// import "./styles.scss";

interface Props {
  visible: boolean;
  onCancel: () => void;
  tableRef: any;
  data: any;
  translate: any;
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
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 19, offset: 4 },
  },
};
const layoutAddAnswer = {
  wrapperCol: { offset: 4, span: 18 },
};
const ModalSession = (props: Props) => {
  const [form] = Form.useForm();
  const [Loading, setLoading] = useState(false);
  const [typeQuestion, setTypeQuestion] = useState(null);
  const [listAnswer, setListAnswer] = useState([]);
  const { execute } = useApi();
  const {
    ADD_QUESTION,
    EDIT_QUESTION,
    QUESTION,
    CONTENT,
    TYPE_QUESTION_COLUMNS,
    ANSWER,
    ADD_ANSWER,
    CANCEL,
    CHOOSE_QUESTION,
    REQUIRE,
    ORDER,
  } = props.translate;
  const validateMessages = {
    required: "${label} " + REQUIRE,
    // ...
  };

  useEffect(() => {
    if (props.data) {
      form.setFieldsValue(props.data);
      if (props.data.answers) {
        const answersConvertForm =
          props.data.type !== 2
            ? props.data.answers.map((item) => item.content)
            : [];
        const answersConvertListAnswer =
          props.data.type !== 2
            ? props.data.answers.map((item) => ({
                typeAnswer: item.typeSelect,
              }))
            : [];
        setListAnswer(answersConvertListAnswer);
        form.setFieldsValue({
          answers: answersConvertForm,
        });
      }
      setTypeQuestion(props.data.type);
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
    let answer;
    if (typeQuestion == 1 || typeQuestion == 3) {
      answer =
        values.answers &&
        values.answers.map((item, index) => ({
          index: index.toString(),
          content: values.answers[index] || "",
          selected: false,
          defaultAnswer: false,
          typeSelect: listAnswer[index].typeAnswer,
        }));
    } else {
      answer = [
        {
          index: "0",
          content: "",
          selected: false,
          defaultAnswer: false,
          typeSelect: 2,
        },
      ];
    }

    values.answers = answer;

    if (props.data) {
      execute(updateQuestion(values, props.data.questionId)).then(
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
      execute(createQuestion(values)).then(
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
  const handleChangeTypeQuestion = (value) => {
    setTypeQuestion(value);
  };
  const handleAddAnswer = (add) => {
    setListAnswer((pre) => [...pre, { typeAnswer: 0 }]);
    add();
  };
  const handleRemoveAnswer = (name, remove) => {
    setListAnswer((pre) => pre.filter((item, index) => index != name));
    remove(name);
  };
  const handleChangeTypeAnswer = (value, indexAnswer) => {
    setListAnswer((pre) =>
      pre.map((item, index) => {
        return indexAnswer == index ? { typeAnswer: value } : item;
      })
    );
  };

  return (
    <Modal
      title={props.data ? EDIT_QUESTION : ADD_QUESTION}
      className={"modal-question"}
      visible={props.visible}
      maskClosable={false}
      okText={props.data ? EDIT_QUESTION : ADD_QUESTION}
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
        <Form.Item rules={[{ required: true }]} label={CONTENT} name="content">
          <Input />
        </Form.Item>
        <Form.Item
          rules={[{ required: true }]}
          label={TYPE_QUESTION_COLUMNS}
          name="type"
          // initialValue={"1"}
        >
          <Select
            onChange={handleChangeTypeQuestion}
            placeholder={CHOOSE_QUESTION}
          >
            {Object.keys(TYPE_QUESTION).map((key) => (
              <Select.Option value={parseInt(key)}>
                {TYPE_QUESTION[key][props.language]}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        {(typeQuestion == 1 || typeQuestion == 3) && (
          <Form.List name="answers">
            {(fields, { add, remove }) => {
              return (
                <div>
                  {fields.map((field, index) => (
                    <Form.Item
                      {...(index === 0
                        ? formItemLayout
                        : formItemLayoutWithOutLabel)}
                      label={index === 0 ? ANSWER : ""}
                      required={true}
                      key={field.key}
                      className="form-item-content-multi"
                    >
                      <div className="d-flex justify-content-between">
                        <Form.Item
                          {...field}
                          validateTrigger={["onChange", "onBlur"]}
                          rules={[
                            {
                              required: listAnswer[index]?.typeAnswer != 1,
                              message: `${ANSWER} ${REQUIRE}`,
                            },
                          ]}
                          noStyle
                        >
                          <Input
                            style={{ width: "70%" }}
                            disabled={listAnswer[index]?.typeAnswer == 1}
                          />
                        </Form.Item>
                        <Select
                          onChange={(value) =>
                            handleChangeTypeAnswer(value, index)
                          }
                          defaultValue={0}
                          style={{ width: "20%" }}
                          value={listAnswer[index]?.typeAnswer}
                        >
                          {Object.keys(TYPE_ANSWER).map((key) => (
                            <Select.Option value={parseInt(key)}>
                              {TYPE_ANSWER[key][props.language]}
                            </Select.Option>
                          ))}
                        </Select>
                        {fields.length > 1 ? (
                          <MinusCircleOutlined
                            className="dynamic-delete-button"
                            style={{ margin: "0 8px" }}
                            onClick={() => {
                              handleRemoveAnswer(field.name, remove);
                            }}
                          />
                        ) : null}
                      </div>
                    </Form.Item>
                  ))}
                  <Form.Item {...layoutAddAnswer}>
                    <Button
                      type="dashed"
                      onClick={() => {
                        handleAddAnswer(add);
                      }}
                      style={{ width: "100%" }}
                    >
                      <PlusOutlined /> {ADD_ANSWER}
                    </Button>
                  </Form.Item>
                </div>
              );
            }}
          </Form.List>
        )}
      </Form>
    </Modal>
  );
};

export default React.memo(ModalSession);
