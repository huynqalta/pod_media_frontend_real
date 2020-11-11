import React from "react";
import ShowRouter from "./ShowRouter";
import { router } from "@modules/router-pages";
import DefaultLayout from "@components/DefaultLayout";

interface Props {
  privateLogin?: boolean;
}

const AppLogin: React.FC<Props> = ({}) => {
  return (
    <DefaultLayout>
      <ShowRouter routers={router} />
    </DefaultLayout>
  );
};

export default AppLogin;
