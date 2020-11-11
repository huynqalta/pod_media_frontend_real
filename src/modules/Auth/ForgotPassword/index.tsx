import React from "react";
import { Col, Row, Input, Form } from "antd";
import "./styles.scss";
import ButtonComponent from "@components/commons/ButtonComponent/Button.Component";
import { forgotPassword } from "@modules/Auth/service";

import { useRouter, useTranslate } from "@shared/Hook";
import { useApi } from "@server/apiCallAxios";

import { notification } from "antd/es";

import { LoginTranslateKey } from "@shared/TranslateKey/ImportTranslateKey";
import MenuLanguage from "@modules/Auth/component/Language";

const ForgotPassword = props => {
  const { execute, loading } = useApi({ showSuccess: true, _useDispatch: true, useLoading: true });
  const router = useRouter();
  const [form] = Form.useForm();
  const { BACK_LOGIN, RECOVER, LINK_RECOVER, SEND, MESS_FORMAT_EMAIL, MESS_EMAIL } = useTranslate(LoginTranslateKey);

  const onFinish = value => {
    const raw = {
      email: value.email.trim(),
    };

    execute(forgotPassword(raw)).then(res => {
      if (res) {
        form.resetFields();
        notification.success({ message: res.message });
      }
    });
  };

  return (
    <Row className={"forgot-pass"}>
      <div className="bg-black" />
      <Col className={"form-login text-center"}>
        <div className="d-flex justify-content-end">
          <MenuLanguage />
        </div>
        <div className={"custom-title"}>
          <label>{RECOVER}</label>
          <span>{LINK_RECOVER}</span>
        </div>
        <div className={"form-input-login my-3 text-left"}>
          <Form form={form} onFinish={onFinish} className="form-basic" layout="vertical">
            <Form.Item
              label={"Email"}
              name="email"
              rules={[
                { required: true, message: MESS_EMAIL },
                {
                  type: "email",
                  message: MESS_FORMAT_EMAIL,
                },
              ]}
            >
              <Input autoComplete={"off"} />
            </Form.Item>

            <div className="text-center">
              <span className="text-primary cursor-pointer" onClick={() => router.push("/login")}>
                {BACK_LOGIN}
              </span>
            </div>
            <div className="d-flex justify-content-center mt-4">
              <Form.Item>
                <ButtonComponent text={SEND} type="submit" loading={loading} disabled={loading} />
              </Form.Item>
            </div>
          </Form>
        </div>
      </Col>
    </Row>
  );
};
export default ForgotPassword;
