import React, {useContext, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';

import {Layout, Dropdown, Menu} from 'antd';
import {MenuOutlined, CloseOutlined} from '@ant-design/icons';

import {
    faKey,
    faLanguage,
    faUserCircle,
    faSignInAlt,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import jwt from 'jsonwebtoken';

import {LanguageContext} from '@shared/Context/Language';
import {useTranslate} from '@shared/Hook';
import {CommonTranslateKey} from '@shared/TranslateKey/ImportTranslateKey';
import {layoutContext} from '@components/DefaultLayout';
import {expiredToken} from '@server/setAuthorizationToken';
import {ACCESS_JWTTOKEN, CURRENT_LANGUAGE} from '@helper/variable';
import {login} from '@reducer/loginReducer';

import './styles.scss';

const {Header} = Layout;
const logo = require('../../../assets/images/logo.png');

const HeaderComponent = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {toogleSider, setToogleSider} = useContext(layoutContext);
    const {language, setLanguage} = useContext(LanguageContext);
    const {CHANGE_PASSWORD, LOG_OUT} = useTranslate(CommonTranslateKey);
    const token = localStorage.getItem(ACCESS_JWTTOKEN);

    // let language = language;
    let nameUser = '';
    try {
        nameUser = jwt.decode(token)['UserName'];
    } catch (error) {
    }

    const toggle = () => {
        setToogleSider(!toogleSider);
    };

    const OnChangePass = () => {
        history.push('/change-password');
    };

    const Logout = () => {
        expiredToken();
        history.push('/login');
        dispatch(login(true));
    };

    const changLang = (lang) => {
        localStorage.setItem(CURRENT_LANGUAGE, lang);
        setLanguage(lang);
    };

    const menuLang = (
        <Menu>
            <Menu.Item>
                <a
                    className={language == 'USA' && 'active'}
                    onClick={() => changLang('USA')}
                >
                    English
                </a>
            </Menu.Item>
            <Menu.Item>
                <a
                    className={language == 'VNM' && 'active'}
                    onClick={() => changLang('VNM')}
                >
                    Việt Nam
                </a>
            </Menu.Item>
        </Menu>
    );

  const menu = (
    <Menu>
      <Menu.Item>
        <div style={{ fontWeight: 'bold' }}>{nameUser || ''}</div>
      </Menu.Item>
      <Menu.Item onClick={OnChangePass}>
        <div>
          <FontAwesomeIcon icon={faKey} /> {CHANGE_PASSWORD}
        </div>
      </Menu.Item>
      <Menu.Item onClick={Logout}>
        <div>
          <FontAwesomeIcon icon={faSignInAlt} /> {LOG_OUT}
        </div>
      </Menu.Item>
    </Menu>
  );
  return (
    <Header
      className='headerComponent d-flex '
      style={{ position: 'fixed',zIndex:1, width: '100%' }}
    >
      {/* <div className={`logo w-100  ${toogleSider && 'collapsed'}`}>
        <img className='' src={logo} alt='' />
        <span>
          {React.createElement(toogleSider ?  MenuOutlined:  CloseOutlined, {
            className: 'trigger icon-custom',
            key: 'iconToogle',
            onClick: toggle,
          })}
        </span>
            </div> */}
            {/* <button onClick={() => expiredToken()}>Expired Token</button> */}
            <div className='d-flex mr-4 justify-content-end w-100'>
                <Dropdown
                    trigger={['click']}
                    overlay={menuLang}
                    placement='bottomCenter'
                    arrow
                >
                    <a>
                        {' '}
                        <FontAwesomeIcon
                            color='#198bca'
                            style={{fontSize: '2rem', cursor: 'pointer'}}
                            icon={faLanguage}
                        />
                    </a>
                </Dropdown>
                <div className='mr-5'></div>
                <Dropdown
                    trigger={['click']}
                    overlay={menu}
                    placement='bottomCenter'
                    arrow
                >
                    <a>
                        <FontAwesomeIcon
                            color='#198bca'
                            style={{fontSize: '2rem', cursor: 'pointer'}}
                            icon={faUserCircle}
                        />
                    </a>
                </Dropdown>
            </div>
        </Header>
    );
};

export default HeaderComponent;
