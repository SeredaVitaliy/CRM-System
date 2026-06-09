import styles from "./AuthLayout.module.css";
import { Outlet } from "react-router";
import img from "../../assets/image.png";
import { Image, Layout } from "antd";

const { Sider, Content } = Layout;

export default function AuthLayout() {
  return (
    <Layout className={styles.loginPage}>
      <Sider className={styles.leftSide} width="60%">
        <Image src={img} preview={false} alt="leftSideImage" />
      </Sider>
      <Content className={styles.rightSide}>
        <Outlet />
      </Content>
    </Layout>
  );
}
