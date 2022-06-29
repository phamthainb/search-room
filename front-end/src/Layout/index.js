import { Layout, Menu } from "antd";
import React, { useEffect } from "react";
import { DesktopOutlined, LoginOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, onClick) {
  return {
    key,
    icon,
    onClick,
    label,
  };
}

export default function Layouts(props) {
  const nav = useNavigate();

  const items = [
    getItem("Search Room", "1", <DesktopOutlined />, () => {
      nav("/");
    }),
    getItem("Logout", "2", <LoginOutlined />, () => {
      nav("/login", { replace: true });
    }),
  ];

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      nav("/login", { replace: true });
    }
  }, [nav]);

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider collapsible>
        <div className="logo" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        />
        <Content
          style={{
            margin: "0 16px",
            padding: "45px",
          }}
        >
          {props.children}
        </Content>
        <Footer
          style={{
            textAlign: "center",
            fontSize: 36
          }}
        >
          Created by Team 22 PTIT with love ❤️❤️❤️
        </Footer>
      </Layout>
    </Layout>
  );
}
