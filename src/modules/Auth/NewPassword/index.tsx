import React from "react";
import {Col, Row, Input, Form} from "antd";
import "./styles.scss";
import {useHistory, withRouter} from "react-router-dom";
import ButtonComponent from "@components/commons/ButtonComponent/Button.Component";
import { newPassword} from "@modules/Auth/service";
import {useApi} from "@server/apiCallAxios";
import {notification} from "antd/es";
import loginReducer from "@modules/Auth/login/router"
const queryString = require('query-string');

const NewPassword = props => {
    const { execute, loading} = useApi({showSuccess: true, _useDispatch: true, useLoading: true});
    const [form] = Form.useForm();
    const keyNewPass = queryString.parse(props.history.location.search).key;
    const history = useHistory()

    const onFinish = (value) => {

        const raw = {
            PasswordNew: value.PasswordNew.trim(),
            ConfirmPassword: value.ConfirmPassword.trim(),
        };

        execute(newPassword(keyNewPass, raw)).then(res => {
            if (res) {
                // console.log(res,"res=========");
                form.resetFields();
                history.push(loginReducer.path)
                notification.success({message: res.message})
                
            }
        })
    };


    return (

        <Row className={"new-password"}>
            <div className="bg-black"/>
            <Col className={"form-login text-center"}>
                <div className="logo my-3 text-center color-theme">
                    <span className={"iconUser"}/>
                </div>
                <div className={"custom-title"}>
                    <label>Reset your password</label>
                    <span>Input new your password.</span>
                </div>
                <div className={"form-input-login my-3 text-left"}>
                    <Form form={form} onFinish={onFinish} className="form-basic" layout="vertical">
                        <Form.Item label={'New password'} name="PasswordNew"
                                   rules={[{required: true, message: "Please input password!"}]}>
                            <Input.Password autoComplete={"off"}/>
                        </Form.Item>

                        <Form.Item label={'Confirm new password'} name="ConfirmPassword"  dependencies={['password']}
                                   rules={[{required: true, message: "Please input new password!"},({ getFieldValue }) => ({
                                    validator(rule, value) {
                                      if (!value || getFieldValue('PasswordNew') === value) {
                                        return Promise.resolve();
                                      }
                                      return Promise.reject('The two passwords that you entered do not match!');
                                    },
                                  }),]}>
                            <Input.Password autoComplete={"off"}/>
                        </Form.Item>

                        <div className="text-center">
                            <span className="text-primary cursor-pointer" onClick={()=>props.history.push("/login")}>Back to login</span>
                        </div>
                        <div className="d-flex justify-content-center mt-4">
                            <Form.Item>
                                <ButtonComponent text={'Reset'} type="submit" loading={loading} disabled={loading}/>
                            </Form.Item>
                        </div>
                    </Form>
                </div>
            </Col>
        </Row>

    );
};
export default withRouter(NewPassword);
