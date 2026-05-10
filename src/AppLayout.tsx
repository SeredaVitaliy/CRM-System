import { Outlet } from "react-router";
import NavList from "./components/NavList/NavList";
import { Layout } from "antd";

const { Sider, Content } = Layout;

export default function AppLayout() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider>
        <NavList />
      </Sider>
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
}
