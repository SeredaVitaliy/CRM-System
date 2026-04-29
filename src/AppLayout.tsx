import { Outlet } from "react-router";
import NavList from "./components/NavList/NavList";
import styles from "./AppLayout.module.css";

export default function AppLayout() {
  return (
    <div className={styles.sidebar}>
      <NavList />

      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
}
