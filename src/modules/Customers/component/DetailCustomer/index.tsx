import React, { useEffect, useState } from 'react';
import Table from 'antd/es/table/Table';
import { useApi } from '@server/apiCallAxios';
import { detailCustomer, SurveyCustomer } from '@modules/Customers/service';
import { InitPageCustomer } from '@modules/Customers/interface';
import { withRouter } from 'react-router';

import { Card } from 'antd';
import { Link } from 'react-router-dom';
import MapComponent from '@components/commons/Map';
import Modal from 'antd/lib/modal/Modal';
import FormSurvey from './FormSurvey';
import { useTranslate } from '@shared/Hook';
import { CustomersTranslateKey } from '@shared/TranslateKey/ImportTranslateKey';

const queryString = require('query-string');

const DetailCustomer = (props) => {
  const { execute, loading, res } = useApi({
    useLoading: true,
    useRes: true,
    initRes: [],
  });
  const [dataMap, setDataMap] = useState<Array<any>>([]);
  const customerID = queryString.parse(props.history.location.search).key;
  const customerName = queryString.parse(props.history.location.search).name;
  const [page, setPage] = useState(InitPageCustomer);
  const [displayForm, setDisplayForm] = useState(false);
  const [dataRow, setRow] = useState('');

  useEffect(() => {
    GetDetailCustomer(InitPageCustomer);
  }, []);

  const GetDetailCustomer = (data) => {
    execute(detailCustomer(customerID, data)).then((res) => {
      setPage((prev) => ({ ...prev, total: res.info.totalRecord }));
      const dataConvertMap = res.data.map((item) => ({
        lat: item.device.latitude || '',
        lng: item.device.longitude,
        place: item.device.deviceName,
      }));
      setDataMap(dataConvertMap);
    });
  };

  const handleChangeTable = (pagination) => {
    GetDetailCustomer({ ...page, page: pagination.current });
  };

  const closeForm = () => {
    setDisplayForm(false);
  };
  const {
    DEVICE_NAME,
    TEMP,
    WEIGHT,
    HEIGHT,
    HEART,
    ACTION,
    SURVEY,
    SHOW_SURVEY,
  } = useTranslate(CustomersTranslateKey);
  const columns = [
    {
      title: DEVICE_NAME,
      dataIndex: 'device',
      render: (text) => {
        return <span>{text?.deviceName}</span>;
      },
    },
    {
      title: 'BMI',
      dataIndex: 'bmi',
    },
    {
      title: TEMP,
      dataIndex: 'temp',
    },
    {
      title: 'SBP',
      dataIndex: 'sbp',
    },
    {
      title: 'DBP',
      dataIndex: 'dbp',
    },
    {
      title: WEIGHT,
      dataIndex: 'weight',
    },
    {
      title: HEIGHT,
      dataIndex: 'height',
    },
    {
      title: HEART,
      dataIndex: 'heart',
    },
    {
      title: "",
      dataIndex: '',
      key: 'action',
      width: 120,
      render: (text, rowData) => (
        <>
          <span
            onClick={() => {
              //Fix bug rowData - Hoa
              if (rowData.device){
                setDisplayForm(!displayForm);
                setRow(rowData);
              }
            }}
            className='cursor-pointer text-primary'
          >
            {rowData.device? SHOW_SURVEY: "No data"}
          </span>
        </>
      ),
    },
  ];

  return (
    <>
      <h4 className='mb-5'>Detail customer - {customerName}</h4>
      <Card>
        <Table
          columns={columns}
          dataSource={res.data}
          loading={loading}
          pagination={page}
          onChange={handleChangeTable}
        />

        <div style={{ width: '100%', height: '500px', margin: 'auto' }}>
          <MapComponent position={dataMap} />
        </div>
      </Card>
      <FormSurvey
        displayForm={displayForm}
        closeForm={closeForm}
        dataRow={dataRow}
      />
    </>
  );
};

export default withRouter(DetailCustomer);
