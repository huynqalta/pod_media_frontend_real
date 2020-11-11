import React, { useEffect } from 'react';
import { Modal, Button, Card } from 'antd';
import { useApi } from '@server/apiCallAxios';
import { showCodeActive } from '@modules/Devices/service';
import NotificationComponent from '@components/commons/NotificationComponent';
import { useState } from 'react';
import { useTranslate } from '@shared/Hook';
import { DevicesTranslatekey } from '@shared/TranslateKey/ImportTranslateKey';

const FormActiveCode = ({ closeForm, displayForm, data }) => {
  const { execute } = useApi();
  const [dataRespone, setDataRespone] = useState(null);
  const { DES_ACTIVE } = useTranslate(DevicesTranslatekey);
  useEffect(() => {
    execute(showCodeActive(data.deviceId)).then((res) => {
      if (res) {
        setDataRespone(res.data);
        NotificationComponent({
          type: 'success',
          notificationProps: { message: res.message },
        });
      }
    });
  }, []);
  return (
    <div>
      <Modal
        visible={displayForm}
        onCancel={() => {
          closeForm();
        }}
        footer={null}
        title='Show Code'
      >
        <Card>
          <p style={{ fontSize: '20px' }}>
            {DES_ACTIVE} {data.deviceName} là: {dataRespone}{' '}
          </p>
        </Card>
      </Modal>
    </div>
  );
};

export default FormActiveCode;
