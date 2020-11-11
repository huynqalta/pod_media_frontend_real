import { NavItem } from "@components/layout/SiderComponent/interface";
import { DASHBOARD } from "@modules/router-paths";
import { Breadcrumb } from "@reducer/BreadcrumbReducer";
import { LanguageContext } from "@shared/Context/Language";
import { Dropdown, Menu, PageHeader } from "antd";
import React, { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation, Link } from "react-router-dom";
import { dispatch } from "rxjs/internal/observable/pairs";
import useBreadcrumb from "./hook/useBreadcrumb";
import "./styles.scss";

interface Props {
  navigation: NavItem[];
}
const queryString = require("query-string");
const PageHeaderComponent = (props: Props) => {
  const location = useLocation();
  const breadcrumbState = useBreadcrumb()
  const dispatch = useDispatch()
  const history = useHistory();
  const firstPath = location.pathname.split("/")[1] || "";
  const { language } = useContext(LanguageContext);


  const getBreadcrumbsLoop = (router, open) => {
    let _open = [...open];
    for (let index = 0; index < router.length; index++) {
      const item = router[index];
      const activePath = "/" + firstPath;
      const isActive = item.activePath.indexOf(activePath) != -1;
      const children = item.children.filter(i => !i.ishidden) || [];
      if (isActive) {
        if (item.children.length > 0) {
          _open = getBreadcrumbsLoop(item.children, [...open, { path: item.path, breadcrumbName: item.name[language], children: children }]);
        } else {
          _open = [...open, { path: item.path, breadcrumbName: item.name[language], children: children }];
        }
      }
    }
   
    return _open
  };

  let routes: { path: string; breadcrumbName: string }[] 
  
 useEffect(()=>{
  routes = getBreadcrumbsLoop(props.navigation, [{
    path: "/",
    breadcrumbName: "Home",
  }]);
  
 
  dispatch(Breadcrumb({routers:routes , status:"success"}))
 }, [location.pathname])


  const itemRender = (route, params, routes, paths) => {
    const lastItem = routes[routes.length - 1];
    const last = routes.indexOf(route) === routes.length - 1;
    if (last) {
      return <span>{route.breadcrumbName}</span>;
    }
    if (route.children?.length > 0) {
      const childTemp = route.children.filter(i => i.path != lastItem.path);

      const menu = (
        <Menu>
          {childTemp.map((item, index) => {
            return (
              <Menu.Item key={index}>
                <Link to={item.path}>{item.name[language]}</Link>
              </Menu.Item>
            );
          })}
        </Menu>
      );
      return (
        <Dropdown overlay={menu} arrow={false}>
          <a>{route.breadcrumbName}</a>
        </Dropdown>
      );
    }
    return <Link to={route.path}>{route.breadcrumbName}</Link>;
  };
 
  if ([DASHBOARD, "/"].indexOf(location.pathname) != -1) {
    return null;
  }
  
  const {routers , status} = breadcrumbState
  const lastIndex = routers && routers.length - 1;

  const onBack = () => {
    if (lastIndex > 1 && routers[lastIndex - 1].path) {
      return history.push(routers[lastIndex - 1].path);
    } else {
      return undefined;
    }
  };


  // useEffect(()=>{
  //   if(breadcrumbState?.status == "modified"){
  //       dispatch(Breadcrumb({routers:breadcrumbState.routers , status:"success"}))
  //   }
  // },[breadcrumbState])

 
  return (
    <PageHeader
      className="site-page-header"
      {...onBack}
      breadcrumb={{ itemRender: itemRender, routes:routers }}
      title={ undefined}
    />
  );
};

export default PageHeaderComponent;
