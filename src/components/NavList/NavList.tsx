import { Link, useLocation } from "react-router";

import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

type MenuItem = Required<MenuProps>["items"][number];

export default function NavList() {
  const location = useLocation();
  const userRoles = useSelector((state: RootState) => state.auth.user?.roles);

  const activeUsersMenu = userRoles?.some(
    (role) => role === "ADMIN" || role === "MODERATOR",
  );

  const items: MenuItem[] = [
    { key: "/", label: <Link to="/">Todo</Link> },
    { key: "/profile", label: <Link to="/profile">Профиль</Link> },
    ...(activeUsersMenu
      ? [{ key: "/users", label: <Link to="/users">Пользователи</Link> }]
      : []),
  ];

  return (
    <Menu
      items={items}
      theme="dark"
      mode="inline"
      selectedKeys={[location.pathname]}
    />
  );
}
