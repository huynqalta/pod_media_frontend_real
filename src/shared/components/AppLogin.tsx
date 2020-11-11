import React from "react";
import { useHistory } from "react-router-dom";
import ShowRouter from "./ShowRouter";
import { routerApp } from "@shared/router";

import LangProvider from "@shared/Context/Language";

interface Props {
  privateLogin?: boolean;
}

const AppNotLogin: React.FC<Props> = ({ privateLogin }) => {
  const history = useHistory();
  if (!privateLogin) {
    history.push("/");
  }
  return (
    <>
      <LangProvider>
        <ShowRouter routers={routerApp} />
      </LangProvider>
    </>
  );
};

export default AppNotLogin;
