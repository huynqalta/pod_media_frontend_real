import React, { useContext, useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import { routerSidebar } from './_nav';
import { NavItem } from './interface';
import { Link, useHistory, useLocation } from 'react-router-dom';

import './styles.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { layoutContext } from '@components/DefaultLayout';
import { LanguageContext } from '@shared/Context/Language';
import { CloseOutlined, MenuOutlined } from '@ant-design/icons';

const { Sider , Header, Content } = Layout;
const { SubMenu } = Menu;
const logo = require('../../../assets/images/logo.png');

const SiderComponent = (props) => {
  const location = useLocation();
  const history = useHistory();
  const { toogleSider, setToogleSider } = useContext(layoutContext);
  const [openKeys, setOpenKeys] = useState(null);
  const firstPath = location.pathname.split('/')[1] || '';
  const { language, setLanguage } = useContext(LanguageContext);
  const currentLang = language;

  useEffect(() => {
    setOpenKeys(dequy(routerSidebar, []));
  }, [firstPath]);

  const dequy = (router, open) => {
    let _open = [...open];
    for (let index = 0; index < router.length; index++) {
      const item = router[index];
      const activePath = '/' + firstPath;
      const isActive = item.activePath.indexOf(activePath) != -1;
      if (isActive) {
        if (item.children.length > 0) {
          _open = dequy(item.children, [...open, item.path]);
        } else {
          _open = [...open, item.path];
        }
      }
    }
    return _open;
  };
  const renderIcon = (item) => {
    if (item.flgAwesome && item.icon)
      return (
        <FontAwesomeIcon className={'icon-label fa-lg mr-2'} icon={item.icon} />
      );
    if (!item.flgAwesome && item.iconAnt)
      return React.createElement(item.iconAnt, { className: 'icon-label' });
    return undefined;
  };
  const renderMenu = (routers: Array<NavItem>) => {
    const result = routers.map((item: NavItem, index) => {
      const _icon = renderIcon(item);
      if (item.children.length > 0) {
        const isNotChild = item.children.every((i) => i.ishidden);
        if (isNotChild) {
          return (
            <Menu.Item  onClick={()=>history.push(item.path)} icon={_icon} key={item.path} >
              <a  className='item-label'>
                {item.name[currentLang]}
              </a>
            </Menu.Item>
          );
        }
        return (
          <SubMenu
            key={item.path}
            icon={_icon}
            title={
              <span className='label-menu-item'>{item.name[currentLang]}</span>
            }
          >
            {renderMenu(item.children)}
          </SubMenu>
        );
      } else if (!item.ishidden) {
        return (
          <Menu.Item icon={_icon} onClick={()=>history.push(item.path)} key={item.path}>
            <a  className='item-label'>
              {item.name[currentLang]}
            </a>
          </Menu.Item>
        );
      }
    });
    return result;
  };

  const toggle = () => {
    setToogleSider(!toogleSider);
};
  return (
    <Sider
      className={`siderComponent`}
      trigger={null}
      collapsed={toogleSider}
      width={225}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
      }}
    >
      <div className={`logo w-100  ${toogleSider && 'collapsed'}`}>
        <img className='' src={logo} alt='' />
        <span className="icon">
          {React.createElement(toogleSider ?  MenuOutlined:  CloseOutlined, {
            className: 'trigger icon-custom',
            key: 'iconToogle',
            onClick: toggle,
          })}
        </span>
      </div>
      {openKeys && (
        <Menu
          theme='dark'
          mode='inline'
          defaultOpenKeys={openKeys}
          defaultSelectedKeys={openKeys}
        >
          {renderMenu(routerSidebar)}
        </Menu>
      )}
    
    </Sider>
  );
};

export default SiderComponent;
