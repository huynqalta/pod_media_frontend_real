import PrivateLogin from "@middlewares/PrivateLogin";
import React, { Suspense, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import LanguageProvider from "@shared/Context/Language";
import { ACCESS_JWTTOKEN } from "@helper/variable";
import { useDispatch } from "react-redux";
import { login } from "@reducer/loginReducer";
import ShowRouter from "./ShowRouter";
import LoginRouter from "@modules/Auth/login/router"
import LoadingComponent from "@components/commons/LoadingComponent/loadingComponent";
import { notification } from "antd";
const AppLogin = React.lazy(() => import("./AppLogin"));
const AppPages = React.lazy(() => import("./AppPages"));
interface Iprops {
  privateLogin: boolean;
}

const App = ({ privateLogin }: Iprops) => {
  const dispatch = useDispatch();
  useEffect(() => {
  notification.config({ placement: "bottomRight" });

    const token = localStorage.getItem(ACCESS_JWTTOKEN);
    if (!token) {
      dispatch(login(true));
    } 
  }, []);
  return (
    <Switch>
      <LanguageProvider>
         <Route
                key={LoginRouter.path}
                path={LoginRouter.path}
                exact={LoginRouter.exact}
                component={LoginRouter.main}
            />
        <Suspense fallback={<LoadingComponent/>}>
        {/* <ShowRouter routers={[LoginRouter]} /> */}
          {privateLogin ? <AppLogin privateLogin /> : <AppPages privateLogin />}
          </Suspense>
      </LanguageProvider>
    </Switch>
  );
};

export default PrivateLogin(App);
