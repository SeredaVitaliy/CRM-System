import { Link, useLocation } from "react-router";

import type { MenuProps } from "antd";
import { Menu } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  { key: "/", label: <Link to="/">Todo</Link> },
  { key: "/profile", label: <Link to="/profile">Profile</Link> },
];

export default function NavList() {
  const location = useLocation();

  return (
    <Menu
      items={items}
      theme="dark"
      mode="inline"
      selectedKeys={[location.pathname]}
    />
  );
}
