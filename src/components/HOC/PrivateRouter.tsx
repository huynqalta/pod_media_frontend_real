import React, { useContext, useEffect } from "react";
import { withRouter } from "react-router";
import jwt from "jsonwebtoken";

interface IProps {
  permission?: Array<any>;
  children: any;
  history?: any;
  groupUser?: any;
}

const PrivateRouter = (props: IProps) => {
  const jToken = localStorage.getItem("jwtTokenCMS");

  useEffect(() => {
    // checkPermission();
  }, []);

  return React.useMemo(() => {
    return (
      <>
        {
          // checkPermission()
        }
      </>
    );
  }, [ jToken ]);

  function checkPermission() {
    const token: any = jwt.decode(jToken);
    if (jToken) {
      if (token.FlagLogin == "NEW") {
        props.history.push("/change-password");
      } else {
        return props.children;
      }
    } else {
      alert("login");
      props.history.push("#/login");
      localStorage.clear();
    }
  }
};
export default withRouter<any, any>(PrivateRouter);
