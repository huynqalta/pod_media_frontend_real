import React, { useState } from "react";
import SiderComponent from "src/components/layout/SiderComponent";
import { Layout } from "antd";
import HeaderComponent from "./layout/Header";
import PageHeaderComponent from "./commons/PageHeader";
import { routerSidebar } from "./layout/SiderComponent/_nav";
import UserProvider from "@shared/Context/User";

const { Content, Footer } = Layout;

export const layoutContext = React.createContext(null);

const DefaultLayout = props => {
  const [toogleSider, setToogleSider] = useState(false);

  return (
    
    <layoutContext.Provider
      value={{
        setToogleSider: setToogleSider,
        toogleSider: toogleSider,
      }}
    >
      <UserProvider>
        <Layout>
        <SiderComponent />
        <HeaderComponent />
          <Layout className="site-layout">
              <Content  style={{transition:"ease-in-out 0.2s all" ,overflow: 'initial', marginLeft:`${toogleSider ? "80px" : "225px" }`}}>
                
                <div className={`main-content-wrapper `}>
                  <div className={`wrap-content `}>
                    <PageHeaderComponent navigation={routerSidebar} />
                    {props.children}
                  </div>
                </div>
              </Content>
              <Footer style={{ textAlign: "center" }}>
                © Copyrights <span style={{ color: "black" }}>Alta Media</span> 2020. All rights reserved.
              </Footer>
          </Layout>
        </Layout>
      </UserProvider>
    </layoutContext.Provider>
  );
};
export default DefaultLayout;
