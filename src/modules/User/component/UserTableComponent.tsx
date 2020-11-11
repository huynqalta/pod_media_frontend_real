import React, { useEffect } from 'react';
import { Table } from 'antd';
import moment from 'moment';
import { useApi } from '@server/apiCallAxios';
import { paramsPaginationUser } from '../service';
import { getUser, setCurrentPage, setTotal } from '@reducer/userReducer';
import useMemoSelector from '@components/commons/useMemoSelector';
import { useDispatch } from 'react-redux';
import { useTranslate } from '@shared/Hook';
import { UserTranslateKey } from '@shared/TranslateKey/ImportTranslateKey';

const UserTableComponent = () => {
  const { USER, UPDATE_AT } = useTranslate(UserTranslateKey);
  const columns = [
    // {
    //   title: 'STT',
    //   dataIndex: 'STT',
    //   key: 'name',
    //   render: (text, row, index) => index + 1,
    //   width: '5%',
    // },
    {
      title: USER,
      dataIndex: 'userName',
      key: 'userName',
      width: '30%',
    },
    {
      title: 'Email',
      dataIndex: 'userEmail',
      key: 'userEmail',
      width: '40%',
    },
    {
      title: UPDATE_AT,
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: '30%',
      render: (text) => moment(text).format('DD/MM/YYYY'),
    },
  ];
  const dispatch = useDispatch();
  const { execute } = useApi();

  const { listUser, total, currentPage } = useMemoSelector('user', [
    'listUser',
    'total',
    'currentPage',
  ]);

  useEffect(() => {
    const body = { page: 1, limit: 10, search: '' };
    execute(paramsPaginationUser(body)).then((res) => {
      dispatch(getUser(res.data.data));
      dispatch(setTotal(res.data.info.totalRecord));
    });
  }, []);

  const handleOnChange = (page) => {
    const body = { page: page.current, limit: page.pageSize, search: '' };
    dispatch(setCurrentPage(page.current));
    // setCurrentPage(page.current);
    execute(paramsPaginationUser(body)).then((res) => {
      dispatch(getUser(res.data.data));
    });
  };
  return (
    <div className='userTable'>
      <Table
        pagination={{ total: total, current: currentPage }}
        onChange={handleOnChange}
        columns={columns}
        dataSource={listUser}
      />
    </div>
  );
};

export default React.memo(UserTableComponent);
