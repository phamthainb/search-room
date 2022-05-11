import { Layout, Menu } from "antd";
import React, { useEffect } from "react";
import {
  DesktopOutlined,
  TeamOutlined,
  UserOutlined,
  HomeOutlined,
} from "@ant-design/icons";
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

const items = [
  getItem("Search Room", "1", <DesktopOutlined />, () => {
    window.location.replace("/");
  }),
  getItem("Customer", "2", <UserOutlined />, () => {
    window.location.replace("/c");
  }),
  getItem("Employee", "3", <TeamOutlined />, () => {
    window.location.replace("/e");
  }),
  getItem("Room", "4", <HomeOutlined />, () => {
    window.location.replace("/r");
  }),
];

export default function Layouts(props) {
  const nav = useNavigate();

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
          }}
        >
          Created by Team 22 PTIT with love ❤️❤️❤️
        </Footer>
      </Layout>
    </Layout>
  );
}
