import React, { useState, useEffect } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import axios from "axios";
import useMemoSelector from "@components/commons/useMemoSelector";
import { useDispatch } from "react-redux";
import { login } from "@reducer/loginReducer";

const setResponsive = () => {
  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      let { status } = error.response;
      return Promise.reject(error);
    }
  );
};

function PrivateLogin(Component: React.ComponentType<any | string>) {
  return withRouter(({ history }: RouteComponentProps) => {
    const dispatch = useDispatch();
    const [statusLogin, setStatusLogin] = useState<boolean>(false);
    const { privateLogin } = useMemoSelector("login", ["privateLogin"]);
    useEffect(() => {
      const jwtToken: string = localStorage.getItem("jwtTokenCMS");
      if (jwtToken) {
        // axios.defaults.headers.common["Authorization"] = jwtToken;
        dispatch(login());
      } else {
        // history.push("/login");
      }
      setStatusLogin(true);
      setResponsive();
    }, []);

    return <>{statusLogin && <Component privateLogin={privateLogin} />}</>;
  });
}

export default PrivateLogin;
