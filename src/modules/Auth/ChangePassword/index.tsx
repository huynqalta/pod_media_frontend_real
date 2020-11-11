import React, {useState} from "react";
import {Form, Input} from "antd";
import ButtonComponent from "@components/commons/ButtonComponent/Button.Component";
import {useApi} from "@server/apiCallAxios";
import {useRouter} from "@shared/Hook";
import Card from "antd/es/card";
import {changePass} from "@modules/Auth/service";
import {expiredToken} from "@server/setAuthorizationToken";
import {useDispatch} from "react-redux";
import {login} from "@reducer/loginReducer";
import NotificationComponent from "@components/commons/NotificationComponent";

const ChangePassword = props => {
    const {execute, loading} = useApi({useLoading: true});
    const router = useRouter();
    const [form] = Form.useForm();
    const [disBtn, setDusBtn] = useState(false);
    const dispatch = useDispatch();

    const onFinish = value => {
        setDusBtn(true);
        // console.log(value, "value==========")
        execute(changePass(value))
            .then(res => {
                // console.log(res,"res=======")
                NotificationComponent({type: "success", notificationProps: {message: res.message}});
                expiredToken();
                setDusBtn(false);
                form.resetFields();
                dispatch(login(true));

                setTimeout(function () {
                    router.push("/login")
                },2000) ;

            })
            .catch(err => {
                setDusBtn(false);
            });
    };

    return (
        <>
            {/*<h4 className="mb-5">Change password</h4>*/}
            <div className="d-flex justify-content-center">
                <Card style={{width: 500}}>
                    <Form form={form} onFinish={onFinish} className="form-basic" layout="vertical">
                        <Form.Item label={"Old password "} name="passwordOld"
                                   rules={[{required: true, message: "Please input password!"}]}>
                            <Input type="password" autoComplete={"off"}/>
                        </Form.Item>
                        <Form.Item label={"New password"} name="passwordNew"
                                   rules={[{required: true, message: "Please input new password!"}]}>
                            <Input type="password" autoComplete={"off"}/>
                        </Form.Item>
                        <Form.Item label={"Confirm password"} name="passwordConfirm"
                                   rules={[{required: true, message: "Please input confirm password!"}]}>
                            <Input type="password" autoComplete={"off"}/>
                        </Form.Item>
                        <div className="d-flex justify-content-center mt-4">
                            <Form.Item>
                                <ButtonComponent text={"OK"} type="submit" loading={loading} disabled={disBtn}/>
                            </Form.Item>
                        </div>
                    </Form>
                </Card>
            </div>
        </>
    );
};

export default ChangePassword;
