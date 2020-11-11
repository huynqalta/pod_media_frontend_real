import { PlusOutlined } from '@ant-design/icons';
import ButtonComponent from '@components/commons/ButtonComponent/Button.Component';
import { useTranslate } from '@shared/Hook';
import { UserTranslateKey } from '@shared/TranslateKey/ImportTranslateKey';
import { Card } from 'antd';
import React, { createContext, useState } from 'react';
import FormUserComponent from './component/FormUserComponent';
import UserTableComponent from './component/UserTableComponent';

export const UserContext = createContext(false);
import './styles.scss';

const User = () => {
  const [toogleForm, setToogleForm] = useState(false);
  const openForm = () => {
    setToogleForm(!toogleForm);
  };
  const closeForm = () => {
    setToogleForm(!toogleForm);
  };
  const { ADD_USER } = useTranslate(UserTranslateKey);

  return (
    <div>
      <Card>
        <div className='d-flex justify-content-end mb-4'>
          <ButtonComponent
            text={ADD_USER}
            iconAnt={<PlusOutlined />}
            onClick={openForm}
          />
        </div>

        <UserTableComponent />
        <FormUserComponent toogleForm={toogleForm} closeForm={closeForm} />
      </Card>
    </div>
  );
};

export default User;
