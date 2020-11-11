import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import React, { useState } from "react";
interface Iprops {
  record: any;
  data: any;
  setActivedId: (activedId: string) => void;
  onSubmit: (value: string, record) => void;
  active: boolean;
}
const InputName = (props: Iprops) => {

  const { data, onSubmit, record, setActivedId, active } = props;
  const [valueInput, setValueInput] = useState(data);

  const handleChange = (e) => {
    setValueInput(e.target.value);
  }

  return (
    <>
      <div
        className="d-flex"
        style={{ alignItems: "center", justifyContent: "space-between" }}
      >
        {active ? (
          <input
            onKeyDown={
              async (e) => {
                if (e.keyCode == 13) {
                  await onSubmit(valueInput, record);
                  setActivedId(null);
                }
              }
            }
            type='text'
            defaultValue={props.data}
            onChange={handleChange}
          />
        ) : (
            <span>{data}</span>
          )}
        {active ? (
          <SaveOutlined
            onClick={() => {
              onSubmit(valueInput, record);
              setActivedId(null);
            }}
          />
        ) : (
            <EditOutlined onClick={() => setActivedId(record.deviceId)} />
          )}
      </div>
    </>
  );
};
export default React.memo(InputName);
