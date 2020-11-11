import TableComponent from "@components/commons/TableComponent";

import { getLogsDeviceById } from "@modules/DetailDevice/service";

import React, { useRef } from "react";
import { getColumns } from "./tableConfig";

interface Props {
  deviceId: string;
}

const ListLogDevice = (props: Props) => {
  const tableRef = useRef(null);
  const columns = getColumns();

  return (
    <div className="list-log-device">
      <TableComponent
        ref={tableRef}
        key="tableLogDevice"
        rowKey={"logId"}
        columns={columns}
        propsCustom={{
          paginationServer: true,
          paramsAxiosApi: getLogsDeviceById,
          configUseApi: { _useDispatch: false },
          parmas: { id: props.deviceId },
        }}
      />
    </div>
  );
};

export default ListLogDevice;
