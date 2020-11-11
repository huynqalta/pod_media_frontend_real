// import Login from "./index";
import LoadingComponent from "@components/commons/LoadingComponent/loadingComponent";
import Loadable from "react-loadable";

const Login = Loadable({
  loader: () => import("./index"),
  loading: LoadingComponent,
});
export default {
  path: "/login",
  exact: true,
  main: Login,
};