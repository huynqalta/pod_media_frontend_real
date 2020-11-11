import React, { useCallback } from 'react';
import { Dropdown, Button, Menu } from 'antd';
import './style.scss';

interface Iprops {
  arrayAction?: Array<{
    icon: string;
    name: string;
    color: string;
    key: string;
    isAllow?: boolean;
  }>;
  handleAction?: (item, data?: any) => void;
  dataAction?: any;
}

const ThreeDotsComponent = ({
  arrayAction,
  handleAction,
  dataAction,
}: Iprops) => {
  const changeAction = useCallback(
    (item) => {
      handleAction(item.key, dataAction);
    },
    [ dataAction ]
  );
  const menu = (
    <Menu>
      {arrayAction.map((item) => {
        if (!item || item.isAllow == false) return;
        return <Menu.Item onClick={() => changeAction(item)}>
          <div>
            <i
              className={item.icon}
              aria-hidden='true'
              style={{ color: item.color }}
            />
            <span>{item.name}</span>
          </div>
        </Menu.Item>
      })}
    </Menu>
  );
  return (
    <div className='threeDots'>
      <Dropdown
        overlay={menu}
        placement='bottomRight'
        trigger={[ 'click' ]}
        className='three-dots'
      >
        <Button>
          <i className='fa fa-ellipsis-h' aria-hidden='true'></i>
        </Button>
      </Dropdown>
    </div>
  );
};

function areEqual(prevProps, nextProps) {
  if (
    prevProps.dataAction != nextProps.dataAction ||
    prevProps.arrayAction != nextProps.arrayAction
  ) {
    return false;
  }
  return true;
}

export default React.memo(ThreeDotsComponent, areEqual);
