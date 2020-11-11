import { NotificationComponent } from '@components/commons/NotificationComponent';
import useMemoSelector from '@components/commons/useMemoSelector';
import { getUser } from '@reducer/userReducer';
import { useApi } from '@server/apiCallAxios';
import { useTranslate } from '@shared/hook';
import { UserTranslateKey } from '@shared/TranslateKey/ImportTranslateKey';
import { Form, Input } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { paramsAddUser, paramsPaginationUser } from '../service';

interface Prop {
  closeForm: () => void;
  toogleForm: boolean;
}

const FormUserComponent = ({ closeForm, toogleForm }: Prop) => {
  const [form] = Form.useForm();
  const { ADD_USER, USER, ADD, CANCEL, PASSWORD } = useTranslate(
    UserTranslateKey
  );
  const { execute } = useApi({
    useRes: true,
    useLoading: true,
    _useDispatch: true,
    initRes: [],
  });
  const { currentPage } = useMemoSelector('user', ['currentPage']);
  useEffect(() => {
    form.resetFields();
  }, []);
  const handleSubmit = () => {
    form.submit();
  };
  const dispatch = useDispatch();
  const onSubmit = (values) => {
    execute(paramsAddUser(values)).then((res) => {
      var body = { page: currentPage, limit: 10, search: '' };
      execute(paramsPaginationUser(body)).then((res) => {
        dispatch(getUser(res.data.data));
      });
      NotificationComponent({
        type: 'success',
        notificationProps: { message: res.message },
      });
      form.resetFields();
      closeForm();
    });
  };

  return (
    <div>
      <Modal
        title={ADD_USER}
        visible={toogleForm}
        onOk={handleSubmit}
        okText={ADD}
        cancelText={CANCEL}
        onCancel={closeForm}
      >
        <Form
          form={form}
          initialValues={{ remember: true }}
          onFinish={onSubmit}
          className='formUser'
        >
          <Form.Item label={USER} name='userName' rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item
            label='Email'
            name='userEmail'
            className='email'
            rules={[{ required: true }]}
          >
            <Input type='email' />
          </Form.Item>
          <Form.Item
            label={PASSWORD}
            name='userPassword'
            rules={[{ required: true }]}
          >
            <Input type='password' />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default FormUserComponent;
