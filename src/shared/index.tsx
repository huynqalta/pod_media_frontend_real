import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import store from "@reducer/RootReducer";
import { Provider } from "react-redux";
import { BrowserRouter, HashRouter } from "react-router-dom";
import "./../styles/style.scss";
import "antd/dist/antd.css";

import { setAuthorizationTokenObservable } from "@server/setAuthorizationToken";
setAuthorizationTokenObservable();
ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById("root")
);
