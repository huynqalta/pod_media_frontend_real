import { getDetailDevice } from "@modules/DetailDevice/service";
import { useApi } from "@server/apiCallAxios";
import { Descriptions } from "antd";
import useDetailDevice from "../hook/useDetailDevices";
import React, { useEffect } from "react";
import { TYPE_ACTIVE } from "@helper/variable";

interface Props {
  deviceId: string;
  language: string;
}

const InforDevice = (props: Props) => {
  const { execute } = useApi({ _useDispatch: true });
  const { infoDevice } = useDetailDevice();

  useEffect(() => {
    if (props.deviceId) {
      execute(getDetailDevice(props.deviceId));
    }
  }, [props.deviceId]);
  return (
    <Descriptions title="Thông tin thiết bị">
      <Descriptions.Item label="Tên Thiết bị">
        {infoDevice["deviceName"] || ""}
      </Descriptions.Item>
      <Descriptions.Item label="Vĩ Độ">
        {infoDevice["latitude"] || ""}
      </Descriptions.Item>
      <Descriptions.Item label="Kinh Độ">
        {infoDevice["longitude"] || ""}
      </Descriptions.Item>
      <Descriptions.Item label="Trạng Thái">
        {(TYPE_ACTIVE[infoDevice["status"]] &&
          TYPE_ACTIVE[infoDevice["status"]][props.language]) ||
          ""}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default InforDevice;
