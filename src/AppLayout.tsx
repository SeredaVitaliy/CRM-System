import { Outlet } from "react-router";
import NavList from "./components/NavList/NavList";

export default function AppLayout() {
  return (
    <div>
      <NavList />

      <main>
        <Outlet />
      </main>
    </div>
  );
}
