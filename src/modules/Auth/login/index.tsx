import React, { useContext, useEffect } from "react";
import { Col, Row, Input, Form, Dropdown, Menu } from "antd";
import "./styles.scss";
import { login } from "@reducer/loginReducer";
import ButtonComponent from "@components/commons/ButtonComponent/Button.Component";
import { loginCMS } from "@modules/Auth/service";
import { useRouter, useTranslate } from "@shared/Hook";
import { useApi } from "@server/apiCallAxios";
import { setTokenAxios } from "@server/setAuthorizationToken";
import { useDispatch } from "react-redux";
import { LoginTranslateKey } from "@shared/TranslateKey/ImportTranslateKey";
import MenuLanguage from "@modules/Auth/component/Language";
import { ACCESS_JWTTOKEN } from "@helper/variable";
import { useHistory } from "react-router";

const Login = props => {
  const { execute, loading } = useApi({ showSuccess: true, _useDispatch: true, useLoading: true });
  const { LOGIN, FORGOT, DES, USER, PASS, MESS_USERNAME, MESS_PASS } = useTranslate(LoginTranslateKey);
  const dispatch = useDispatch();
  const router = useRouter();
  const [form] = Form.useForm();
  const token = localStorage.getItem(ACCESS_JWTTOKEN);

  const checkToken =  async () =>{
    await dispatch(login(false));
    router.push("/");
  }
  useEffect(() => {
    console.log(token)
      if(token){
        checkToken()
        
      }
      return () => {
        
      }
  }, [router])

  const onFinish = value => {
    const raw = {
      password: value.password.trim(),
      userName: value.userName.trim(),
    };

    execute(loginCMS(raw)).then(res => {
      if (res) {
        setTokenAxios(res.data.token);
        dispatch(login(false));
        router.push("/");
        form.resetFields();
      }
    });
  };

  return (

    <Row className={"login"}>
      <div className="bg-black" />
      <Col className={"form-login text-center"}>
        <div className="d-flex justify-content-end">
          <MenuLanguage />
        </div>
        <div className={"custom-title mt-4"}>
          <label>{LOGIN}</label>
          <span>{DES}</span>
        </div>
        <div className={"form-input-login my-3 text-left"}>
          <Form form={form} onFinish={onFinish} className="form-basic" layout="vertical">
            <Form.Item label={USER} name="userName" rules={[{ required: true, message: MESS_USERNAME }]}>
              <Input autoComplete={"off"} />
            </Form.Item>
            <Form.Item label={PASS} name="password" rules={[{ required: true, message: MESS_PASS }]}>
              <Input type="password" autoComplete={"off"} />
            </Form.Item>
            {/*<Form.Item name="isTea" valuePropName="checked">*/}
            {/*    <Checkbox>{'TYPE_LOGIN'}</Checkbox>*/}
            {/*</Form.Item>*/}
            <div className="text-center">
              <span className="text-primary cursor-pointer" onClick={() => router.push("/forgot-password")}>
                {FORGOT}
              </span>
            </div>
            <div className="d-flex justify-content-center mt-4">
              <Form.Item>
                <ButtonComponent text={LOGIN} type="submit" loading={loading} disabled={loading} />
              </Form.Item>
            </div>
          </Form>
        </div>
      </Col>
    </Row>
  
  );
};
export default Login;
