import styles from "./AuthPage.module.css";
import { Outlet } from "react-router";
import img from "../../assets/image.png";

export default function AuthPage() {
  return (
    <div className={styles.loginPage}>
      <div className={styles.leftSide}>
        <img src={img} />
      </div>
      <div className={styles.rightSide}>
        <Outlet />
      </div>
    </div>
  );
}
