import { Link } from "react-router";
import styles from "./NavList.module.css";

export default function NavList() {
  return (
    <div className={styles.navlist}>
      <ul>
        <li>
          <Link to="/">Todo</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
      </ul>
    </div>
  );
}
