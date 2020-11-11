import axios from 'axios';
import { notification } from 'antd';
import { ACCESS_JWTTOKEN, CURRENT_LANGUAGE } from '@helper/variable';
import { NotificationComponent } from '@components/commons/NotificationComponent';

let flagRun = true;
export function setAuthorizationTokenObservable() {
  const token = localStorage.getItem(ACCESS_JWTTOKEN) || '';
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
  axios.defaults.headers.common['Accept-Language'] = 'USA';
  axios.interceptors.response.use(
    function (response) {
      return response.data || response;
    },
    (error) => {
      console.log(error,"response===========")
      let status = error.response.status;

      switch (status) {
        case 401: {
          // NotificationComponent({
          //   type: 'error',
          //   notificationProps: {
          //     message: error?.response?.data?.message || 'authentication',
          //   },
          // });
          expiredToken();
          window.location.reload();
          window.location.href = `/#/login`;
          break;
        }
        case 500: {
          flagRun &&
            NotificationComponent({
              type: 'error',
              notificationProps: {
                message: error?.response?.data?.message || 'errorServer',
              },
            });
          flagRun = false;
          break;
        }
        default: {
          // flagRun &&
            NotificationComponent({
              type: 'error',
              notificationProps: {
                message: error?.response?.data?.message || 'Error!',
              },
            });
          // flagRun = false;
          break;
        }
      }
      return Promise.reject(error);
    }
  );
}

export function setLanguageAxios(_language) {
  localStorage.setItem(CURRENT_LANGUAGE, _language);
}

export function setTokenAxios(jwtToken) {
  localStorage.setItem(ACCESS_JWTTOKEN, jwtToken);
  if (jwtToken) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
  }
}

export function expiredToken() {
  localStorage.removeItem(ACCESS_JWTTOKEN);
  delete axios.defaults.headers.common['Authorization'];
}
